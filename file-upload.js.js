// File Upload and Management System

class FileUploader {
    constructor() {
        this.maxFileSize = 10 * 1024 * 1024; // 10MB
        this.allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/svg+xml',
            'image/gif',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        
        this.uploadQueue = [];
        this.isUploading = false;
        
        this.init();
    }
    
    init() {
        this.setupDropZones();
        this.setupFileInputs();
    }
    
    setupDropZones() {
        document.querySelectorAll('.drop-zone').forEach(zone => {
            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('dragover');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('dragover');
            });
            
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');
                
                const files = Array.from(e.dataTransfer.files);
                this.handleFiles(files, zone);
            });
            
            // Click to upload
            zone.addEventListener('click', () => {
                const input = zone.querySelector('input[type="file"]');
                if (input) input.click();
            });
        });
    }
    
    setupFileInputs() {
        document.querySelectorAll('input[type="file"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const files = Array.from(e.target.files);
                const dropZone = input.closest('.drop-zone') || document.body;
                this.handleFiles(files, dropZone);
            });
        });
    }
    
    async handleFiles(files, targetElement) {
        // Filter and validate files
        const validFiles = files.filter(file => this.validateFile(file));
        
        if (validFiles.length === 0) {
            this.showToast('অনুগ্রহ করে সাপোর্টেড ফাইল আপলোড করুন', 'error');
            return;
        }
        
        // Show preview for images
        validFiles.forEach(file => {
            if (file.type.startsWith('image/')) {
                this.previewImage(file, targetElement);
            }
        });
        
        // Add to upload queue
        this.uploadQueue.push(...validFiles.map(file => ({
            file,
            status: 'pending',
            progress: 0
        })));
        
        // Start upload if not already uploading
        if (!this.isUploading) {
            this.processUploadQueue();
        }
        
        // Track upload event
        if (window.analyticsTracker) {
            window.analyticsTracker.trackFileUpload({
                files: validFiles.map(f => ({
                    name: f.name,
                    type: f.type,
                    size: f.size
                }))
            });
        }
    }
    
    validateFile(file) {
        // Check file size
        if (file.size > this.maxFileSize) {
            this.showToast(`${file.name} ফাইলটি খুব বড় (সর্বোচ্চ ১০MB)`, 'error');
            return false;
        }
        
        // Check file type
        if (!this.allowedTypes.includes(file.type)) {
            this.showToast(`${file.name} ফাইলটি সাপোর্টেড নয়`, 'error');
            return false;
        }
        
        return true;
    }
    
    previewImage(file, container) {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const preview = document.createElement('div');
            preview.className = 'file-preview';
            preview.innerHTML = `
                <div class="relative group">
                    <img src="${e.target.result}" alt="${file.name}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <button class="text-white bg-red-500 hover:bg-red-600 w-8 h-8 rounded-full">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="text-xs mt-1 truncate">${file.name}</div>
                </div>
            `;
            
            // Add remove button functionality
            const removeBtn = preview.querySelector('button');
            removeBtn.addEventListener('click', () => {
                preview.remove();
                // Remove from upload queue
                this.uploadQueue = this.uploadQueue.filter(item => item.file !== file);
            });
            
            // Add to container
            const previewContainer = container.querySelector('.preview-container') || this.createPreviewContainer(container);
            previewContainer.appendChild(preview);
        };
        
        reader.readAsDataURL(file);
    }
    
    createPreviewContainer(container) {
        const previewContainer = document.createElement('div');
        previewContainer.className = 'preview-container flex flex-wrap gap-4 mt-4';
        container.appendChild(previewContainer);
        return previewContainer;
    }
    
    async processUploadQueue() {
        if (this.uploadQueue.length === 0 || this.isUploading) {
            return;
        }
        
        this.isUploading = true;
        
        // Show upload progress
        const progressContainer = this.createProgressContainer();
        
        while (this.uploadQueue.length > 0) {
            const item = this.uploadQueue[0];
            
            try {
                item.status = 'uploading';
                this.updateProgressUI(progressContainer, item);
                
                // Simulate upload (replace with actual upload logic)
                await this.uploadFile(item);
                
                item.status = 'completed';
                item.progress = 100;
                this.updateProgressUI(progressContainer, item);
                
                // Remove from queue
                this.uploadQueue.shift();
                
            } catch (error) {
                item.status = 'failed';
                item.error = error.message;
                this.updateProgressUI(progressContainer, item);
                
                console.error('Upload failed:', error);
                this.showToast(`${item.file.name} আপলোড ব্যর্থ হয়েছে`, 'error');
                
                // Remove failed item
                this.uploadQueue.shift();
            }
        }
        
        this.isUploading = false;
        
        // Hide progress after delay
        setTimeout(() => {
            progressContainer.remove();
        }, 3000);
        
        // Show completion message
        this.showToast('সব ফাইল আপলোড সম্পন্ন হয়েছে', 'success');
    }
    
    async uploadFile(item) {
        return new Promise((resolve, reject) => {
            // Simulate upload progress
            const interval = setInterval(() => {
                item.progress += 10;
                
                if (item.progress >= 90) {
                    clearInterval(interval);
                    
                    // Simulate server response
                    setTimeout(() => {
                        resolve({
                            success: true,
                            file: item.file.name,
                            url: URL.createObjectURL(item.file),
                            size: item.file.size
                        });
                    }, 500);
                }
            }, 200);
            
            // Simulate potential errors
            if (Math.random() < 0.1) { // 10% chance of failure for demo
                setTimeout(() => {
                    clearInterval(interval);
                    reject(new Error('নেটওয়ার্ক সমস্যা'));
                }, 1000);
            }
        });
    }
    
    createProgressContainer() {
        // Remove existing progress container
        const existing = document.getElementById('uploadProgress');
        if (existing) existing.remove();
        
        const container = document.createElement('div');
        container.id = 'uploadProgress';
        container.className = 'fixed bottom-20 right-4 bg-gray-800 rounded-lg p-4 shadow-xl z-50';
        container.innerHTML = `
            <div class="flex items-center justify-between mb-2">
                <h4 class="font-bold">আপলোড প্রোগ্রেস</h4>
                <span class="text-sm text-gray-400" id="uploadCount">${this.uploadQueue.length} ফাইল</span>
            </div>
            <div id="progressItems"></div>
        `;
        
        document.body.appendChild(container);
        return container;
    }
    
    updateProgressUI(container, item) {
        const progressItems