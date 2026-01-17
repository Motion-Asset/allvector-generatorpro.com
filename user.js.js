// User Management System

class UserManager {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
    }
    
    loadUsers() {
        try {
            const users = localStorage.getItem('db_users');
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error loading users:', error);
            return [];
        }
    }
    
    loadCurrentUser() {
        try {
            const user = localStorage.getItem('db_current_user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error loading current user:', error);
            return null;
        }
    }
    
    saveUsers() {
        try {
            localStorage.setItem('db_users', JSON.stringify(this.users));
        } catch (error) {
            console.error('Error saving users:', error);
        }
    }
    
    saveCurrentUser() {
        try {
            localStorage.setItem('db_current_user', JSON.stringify(this.currentUser));
        } catch (error) {
            console.error('Error saving current user:', error);
        }
    }
    
    register(userData) {
        // Check if user already exists
        if (this.users.some(user => user.email === userData.email)) {
            return { success: false, message: 'এই ইমেইলটি ইতিমধ্যে রেজিস্টার্ড' };
        }
        
        // Create new user
        const newUser = {
            id: Date.now(),
            ...userData,
            createdAt: new Date().toISOString(),
            plan: 'free',
            credits: 10,
            designs: [],
            downloads: 0,
            lastLogin: null
        };
        
        // Remove confirm password if exists
        if (newUser.confirmPassword) {
            delete newUser.confirmPassword;
        }
        
        // Add to users array
        this.users.push(newUser);
        this.saveUsers();
        
        // Set as current user
        this.currentUser = newUser;
        this.saveCurrentUser();
        
        return { 
            success: true, 
            user: newUser,
            message: 'অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!'
        };
    }
    
    login(email, password) {
        const user = this.users.find(u => 
            u.email === email && u.password === password
        );
        
        if (user) {
            // Update last login
            user.lastLogin = new Date().toISOString();
            this.currentUser = user;
            this.saveCurrentUser();
            this.saveUsers();
            
            return { 
                success: true, 
                user: user,
                message: 'সফলভাবে লগইন করা হয়েছে!'
            };
        }
        
        return { 
            success: false, 
            message: 'ইমেইল বা পাসওয়ার্ড ভুল'
        };
    }
    
    logout() {
        this.currentUser = null;
        localStorage.removeItem('db_current_user');
        return { success: true, message: 'সফলভাবে লগআউট করা হয়েছে' };
    }
    
    updateProfile(updates) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        // Update current user
        Object.assign(this.currentUser, updates);
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { 
            success: true, 
            message: 'প্রোফাইল আপডেট করা হয়েছে',
            user: this.currentUser
        };
    }
    
    changePassword(currentPassword, newPassword) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        if (this.currentUser.password !== currentPassword) {
            return { success: false, message: 'বর্তমান পাসওয়ার্ড ভুল' };
        }
        
        this.currentUser.password = newPassword;
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { success: true, message: 'পাসওয়ার্ড পরিবর্তন করা হয়েছে' };
    }
    
    upgradePlan(plan) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        const plans = {
            'free': { price: 0, credits: 10 },
            'pro': { price: 499, credits: 1000 },
            'team': { price: 1299, credits: 5000 }
        };
        
        if (!plans[plan]) {
            return { success: false, message: 'অবৈধ প্ল্যান' };
        }
        
        this.currentUser.plan = plan;
        this.currentUser.credits = plans[plan].credits;
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { 
            success: true, 
            message: `${plan} প্ল্যানে আপগ্রেড করা হয়েছে`,
            plan: plan,
            credits: this.currentUser.credits
        };
    }
    
    addDesign(designData) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        if (this.currentUser.plan === 'free' && this.currentUser.credits <= 0) {
            return { success: false, message: 'ক্রেডিট শেষ হয়েছে' };
        }
        
        const newDesign = {
            id: Date.now(),
            ...designData,
            createdAt: new Date().toISOString(),
            downloads: 0
        };
        
        // Add to user's designs
        this.currentUser.designs = this.currentUser.designs || [];
        this.currentUser.designs.push(newDesign);
        
        // Deduct credit for free users
        if (this.currentUser.plan === 'free') {
            this.currentUser.credits = Math.max(0, this.currentUser.credits - 1);
        }
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { 
            success: true, 
            design: newDesign,
            credits: this.currentUser.credits
        };
    }
    
    trackDownload(designId) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        // Find the design
        const design = this.currentUser.designs?.find(d => d.id === designId);
        if (!design) {
            return { success: false, message: 'ডিজাইন খুঁজে পাওয়া যায়নি' };
        }
        
        // Update download count
        design.downloads = (design.downloads || 0) + 1;
        this.currentUser.downloads = (this.currentUser.downloads || 0) + 1;
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { 
            success: true, 
            downloads: design.downloads,
            totalDownloads: this.currentUser.downloads
        };
    }
    
    getStatistics() {
        if (!this.currentUser) {
            return null;
        }
        
        return {
            designs: this.currentUser.designs?.length || 0,
            downloads: this.currentUser.downloads || 0,
            credits: this.currentUser.credits || 0,
            plan: this.currentUser.plan,
            memberSince: new Date(this.currentUser.createdAt).toLocaleDateString('bn-BD')
        };
    }
    
    getUserDesigns() {
        if (!this.currentUser) {
            return [];
        }
        
        return this.currentUser.designs || [];
    }
    
    deleteDesign(designId) {
        if (!this.currentUser) {
            return { success: false, message: 'প্রথমে লগইন করুন' };
        }
        
        const initialLength = this.currentUser.designs?.length || 0;
        this.currentUser.designs = this.currentUser.designs?.filter(d => d.id !== designId) || [];
        
        if (this.currentUser.designs.length === initialLength) {
            return { success: false, message: 'ডিজাইন খুঁজে পাওয়া যায়নি' };
        }
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
            this.saveCurrentUser();
        }
        
        return { 
            success: true, 
            message: 'ডিজাইন ডিলিট করা হয়েছে',
            remainingDesigns: this.currentUser.designs.length
        };
    }
    
    resetPassword(email) {
        const user = this.users.find(u => u.email === email);
        
        if (!user) {
            return { success: false, message: 'এই ইমেইলটি রেজিস্টার্ড নয়' };
        }
        
        // Generate temporary password
        const tempPassword = Math.random().toString(36).slice(-8);
        user.password = tempPassword;
        
        // Update in users array
        const index = this.users.findIndex(u => u.id === user.id);
        if (index !== -1) {
            this.users[index] = user;
            this.saveUsers();
        }
        
        // In production, send email with temp password
        console.log('Temporary password for', email, ':', tempPassword);
        
        return { 
            success: true, 
            message: 'পাসওয়ার্ড রিসেট লিংক ইমেইলে পাঠানো হয়েছে',
            tempPassword: tempPassword // Remove this in production
        };
    }
}

// Initialize User Manager
const userManager = new UserManager();

// Export to global scope
window.userManager = userManager;