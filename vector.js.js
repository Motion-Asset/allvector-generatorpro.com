// Vector Generation System

class VectorGenerator {
    constructor() {
        this.templates = this.loadTemplates();
        this.colors = this.loadColorPalettes();
        this.fonts = this.loadFonts();
    }
    
    loadTemplates() {
        return {
            logo: {
                tech: this.techLogoTemplate(),
                fashion: this.fashionLogoTemplate(),
                restaurant: this.restaurantLogoTemplate(),
                education: this.educationLogoTemplate(),
                default: this.defaultLogoTemplate()
            },
            icon: {
                social: this.socialIconsTemplate(),
                business: this.businessIconsTemplate(),
                tech: this.techIconsTemplate(),
                default: this.defaultIconsTemplate()
            },
            ui: {
                buttons: this.buttonsTemplate(),
                cards: this.cardsTemplate(),
                forms: this.formsTemplate(),
                default: this.defaultUITemplate()
            }
        };
    }
    
    loadColorPalettes() {
        return {
            vibrant: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2'],
            pastel: ['#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD', '#FFDAB9'],
            modern: ['#6366F1', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'],
            corporate: ['#1E40AF', '#1D4ED8', '#2563EB', '#3B82F6', '#60A5FA'],
            nature: ['#16A34A', '#22C55E', '#4ADE80', '#86EFAC', '#BBF7D0']
        };
    }
    
    loadFonts() {
        return {
            modern: 'Inter, sans-serif',
            elegant: 'Playfair Display, serif',
            tech: 'Roboto Mono, monospace',
            friendly: 'Nunito, sans-serif',
            bengali: 'Hind Siliguri, sans-serif'
        };
    }
    
    // Logo Templates
    techLogoTemplate() {
        return {
            shapes: ['circle', 'square', 'triangle'],
            colors: ['#3B82F6', '#8B5CF6', '#10B981'],
            style: 'minimal',
            elements: 3
        };
    }
    
    fashionLogoTemplate() {
        return {
            shapes: ['curve', 'wave', 'circle'],
            colors: ['#EC4899', '#F472B6', '#F9A8D4'],
            style: 'elegant',
            elements: 2
        };
    }
    
    restaurantLogoTemplate() {
        return {
            shapes: ['circle', 'leaf', 'wave'],
            colors: ['#F59E0B', '#EF4444', '#16A34A'],
            style: 'warm',
            elements: 2
        };
    }
    
    educationLogoTemplate() {
        return {
            shapes: ['square', 'book', 'star'],
            colors: ['#1D4ED8', '#3B82F6', '#60A5FA'],
            style: 'formal',
            elements: 3
        };
    }
    
    defaultLogoTemplate() {
        return {
            shapes: ['circle', 'square'],
            colors: ['#6366F1', '#8B5CF6'],
            style: 'modern',
            elements: 2
        };
    }
    
    // Icon Templates
    socialIconsTemplate() {
        return {
            icons: ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'],
            style: 'filled',
            size: 24
        };
    }
    
    businessIconsTemplate() {
        return {
            icons: ['email', 'phone', 'location', 'calendar', 'document'],
            style: 'outline',
            size: 24
        };
    }
    
    techIconsTemplate() {
        return {
            icons: ['code', 'database', 'server', 'cloud', 'settings'],
            style: 'filled',
            size: 24
        };
    }
    
    defaultIconsTemplate() {
        return {
            icons: ['home', 'user', 'settings', 'info', 'help'],
            style: 'outline',
            size: 24
        };
    }
    
    // UI Templates
    buttonsTemplate() {
        return {
            types: ['primary', 'secondary', 'outline', 'ghost'],
            sizes: ['sm', 'md', 'lg'],
            states: ['default', 'hover', 'active', 'disabled']
        };
    }
    
    cardsTemplate() {
        return {
            types: ['basic', 'image', 'stats', 'testimonial'],
            styles: ['flat', 'shadow', 'border'],
            elements: ['header', 'body', 'footer']
        };
    }
    
    formsTemplate() {
        return {
            elements: ['input', 'textarea', 'select', 'checkbox', 'radio'],
            states: ['default', 'focus', 'error', 'success'],
            layouts: ['vertical', 'horizontal', 'inline']
        };
    }
    
    defaultUITemplate() {
        return {
            components: ['button', 'input', 'card'],
            style: 'modern',
            colors: ['#6366F1', '#8B5CF6', '#10B981']
        };
    }
    
    // Main Generation Methods
    async generateLogo(settings) {
        const {
            companyName = 'Your Brand',
            style = 'modern',
            colors = ['#6366F1', '#8B5CF6'],
            template = 'default',
            quality = 'high'
        } = settings;
        
        console.log('Generating logo with settings:', settings);
        
        // Simulate AI processing
        await this.simulateProcessing(1500);
        
        // Get template
        const logoTemplate = this.templates.logo[template] || this.templates.logo.default;
        
        // Generate SVG
        const svg = this.createLogoSVG({
            companyName,
            style,
            colors,
            template: logoTemplate,
            quality
        });
        
        return {
            success: true,
            svg: svg,
            downloadUrl: this.createDownloadURL(svg, 'logo.svg'),
            previewUrl: this.createDataURL(svg),
            metadata: {
                type: 'logo',
                style: style,
                colors: colors,
                quality: quality,
                generatedAt: new Date().toISOString()
            }
        };
    }
    
    async generateIconSet(settings) {
        const {
            type = 'social',
            style = 'filled',
            color = '#6366F1',
            count = 5
        } = settings;
        
        console.log('Generating icon set with settings:', settings);
        
        // Simulate AI processing
        await this.simulateProcessing(2000);
        
        // Get template
        const iconTemplate = this.templates.icon[type] || this.templates.icon.default;
        
        // Generate icons
        const icons = this.createIconSet({
            type,
            style,
            color,
            count,
            template: iconTemplate
        });
        
        return {
            success: true,
            icons: icons,
            downloadUrl: this.createDownloadURL(JSON.stringify(icons), 'icons.json'),
            metadata: {
                type: 'icon_set',
                iconType: type,
                style: style,
                count: count,
                generatedAt: new Date().toISOString()
            }
        };
    }
    
    async generateUIKit(settings) {
        const {
            type = 'default',
            colors = ['#6366F1', '#8B5CF6', '#10B981'],
            font = 'Inter'
        } = settings;
        
        console.log('Generating UI kit with settings:', settings);
        
        // Simulate AI processing
        await this.simulateProcessing(2500);
        
        // Get template
        const uiTemplate = this.templates.ui[type] || this.templates.ui.default;
        
        // Generate UI components
        const components = this.createUIComponents({
            type,
            colors,
            font,
            template: uiTemplate
        });
        
        return {
            success: true,
            components: components,
            downloadUrl: this.createDownloadURL(JSON.stringify(components), 'ui-kit.json'),
            metadata: {
                type: 'ui_kit',
                style: type,
                colors: colors,
                font: font,
                generatedAt: new Date().toISOString()
            }
        };
    }
    
    // SVG Creation Methods
    createLogoSVG(config) {
        const { companyName, style, colors, template, quality } = config;
        const size = quality === 'high' ? 500 : quality === 'medium' ? 300 : 200;
        
        return `
<svg width="${size}" height="${size}" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${colors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${colors[1] || colors[0]};stop-opacity:1" />
        </linearGradient>
        
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="5"/>
            <feOffset dx="3" dy="3" result="offsetblur"/>
            <feComponentTransfer>
                <feFuncA type="linear" slope="0.2"/>
            </feComponentTransfer>
            <feMerge> 
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/> 
            </feMerge>
        </filter>
    </defs>
    
    <rect width="500" height="500" rx="40" fill="url(#logoGradient)"/>
    
    <g transform="translate(150, 150)" filter="url(#shadow)">
        ${this.generateLogoShapes(template)}
    </g>
    
    <text x="250" y="430" text-anchor="middle" font-family="${this.fonts.modern}" 
          font-size="32" font-weight="bold" fill="white">
        ${companyName}
    </text>
    
    <text x="490" y="490" text-anchor="end" font-family="Arial" font-size="10" 
          fill="rgba(255,255,255,0.3)">
        DesignBrief AI
    </text>
</svg>`;
    }
    
    generateLogoShapes(template) {
        const shapes = [];
        const { shapes: shapeTypes, colors, elements } = template;
        
        for (let i = 0; i < elements; i++) {
            const shapeType = shapeTypes[i % shapeTypes.length];
            const color = colors[i % colors.length];
            const x = (i * 70) % 140;
            const y = Math.floor(i / 2) * 70;
            
            shapes.push(this.createShape(shapeType, x, y, color));
        }
        
        return shapes.join('\n');
    }
    
    createShape(type, x, y, color) {
        const size = 60;
        
        switch(type) {
            case 'circle':
                return `<circle cx="${x + size/2}" cy="${y + size/2}" r="${size/2}" fill="${color}" opacity="0.8"/>`;
            case 'square':
                return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="10" fill="${color}" opacity="0.8"/>`;
            case 'triangle':
                return `<polygon points="${x + size/2},${y} ${x + size},${y + size} ${x},${y + size}" fill="${color}" opacity="0.8"/>`;
            case 'curve':
                return `<path d="M${x},${y + size} Q${x + size/2},${y} ${x + size},${y + size}" fill="${color}" opacity="0.8"/>`;
            case 'wave':
                return `<path d="M${x},${y + size/2} C${x + size/3},${y} ${x + 2*size/3},${y + size} ${x + size},${y + size/2}" fill="${color}" opacity="0.8"/>`;
            case 'leaf':
                return `<path d="M${x + size/2},${y} C${x + size},${y + size/3} ${x + size},${y + 2*size/3} ${x + size/2},${y + size} C${x},${y + 2*size/3} ${x},${y + size/3} ${x + size/2},${y} Z" fill="${color}" opacity="0.8"/>`;
            default:
                return `<circle cx="${x + size/2}" cy="${y + size/2}" r="${size/2}" fill="${color}" opacity="0.8"/>`;
        }
    }
    
    createIconSet(config) {
        const { type, style, color, count, template } = config;
        const icons = [];
        
        for (let i = 0; i < Math.min(count, template.icons.length); i++) {
            const iconName = template.icons[i];
            icons.push({
                name: iconName,
                svg: this.createIconSVG(iconName, style, color, template.size),
                downloadUrl: this.createDownloadURL(
                    this.createIconSVG(iconName, style, color, template.size),
                    `${iconName}.svg`
                )
            });
        }
        
        return icons;
    }
    
    createIconSVG(iconName, style, color, size) {
        // Simple icon representation
        // In production, this would use a proper icon library
        return `
<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${style === 'filled' ? color : 'none'}" 
      stroke="${style === 'outline' ? color : 'none'}" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
    ${this.getIconPath(iconName)}
</svg>`;
    }
    
    getIconPath(iconName) {
        // Simplified icon paths
        const paths = {
            facebook: '<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>',
            twitter: '<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>',
            home: '<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/>',
            user: '<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>'
        };
        
        return paths[iconName] || '<circle cx="12" cy="12" r="10"/>';
    }
    
    createUIComponents(config) {
        const { type, colors, font, template } = config;
        
        return {
            colors: {
                primary: colors[0],
                secondary: colors[1] || colors[0],
                accent: colors[2] || colors[0]
            },
            typography: {
                fontFamily: font,
                heading: { size: '2rem', weight: 'bold' },
                body: { size: '1rem', weight: 'normal' }
            },
            components: this.generateUIComponents(template, colors)
        };
    }
    
    generateUIComponents(template, colors) {
        const components = {};
        
        if (template.types) {
            components.buttons = template.types.map(type => ({
                type: type,
                css: this.generateButtonCSS(type, colors[0])
            }));
        }
        
        if (template.types) {
            components.cards = template.types.map(type => ({
                type: type,
                css: this.generateCardCSS(type, colors)
            }));
        }
        
        return components;
    }
    
    generateButtonCSS(type, color) {
        const base = `
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        
        switch(type) {
            case 'primary':
                return `${base} background: ${color}; color: white; border: none;`;
            case 'secondary':
                return `${base} background: rgba(${this.hexToRgb(color)}, 0.1); color: ${color}; border: 1px solid ${color};`;
            case 'outline':
                return `${base} background: transparent; color: ${color}; border: 2px solid ${color};`;
            case 'ghost':
                return `${base} background: transparent; color: ${color}; border: none;`;
            default:
                return `${base} background: ${color}; color: white;`;
        }
    }
    
    generateCardCSS(type, colors) {
        const base = `
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        `;
        
        switch(type) {
            case 'basic':
                return `${base} background: white;`;
            case 'image':
                return `${base} background: white; overflow: hidden;`;
            case 'stats':
                return `${base} background: linear-gradient(135deg, ${colors[0]}, ${colors[1]}); color: white;`;
            case 'testimonial':
                return `${base} background: white; border-left: 4px solid ${colors[0]};`;
            default:
                return `${base} background: white;`;
        }
    }
    
    // Utility Methods
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? 
            `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` 
            : '99, 102, 241';
    }
    
    createDataURL(svg) {
        const encoded = encodeURIComponent(svg);
        return `data:image/svg+xml;charset=utf-8,${encoded}`;
    }
    
    createDownloadURL(content, filename) {
        const blob = new Blob([content], { type: 'image/svg+xml' });
        return URL.createObjectURL(blob);
    }
    
    async simulateProcessing(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Public API
    async generateDesign(brief) {
        try {
            // Analyze brief to determine type
            const analysis = this.analyzeBrief(brief);
            
            let result;
            
            switch(analysis.type) {
                case 'logo':
                    result = await this.generateLogo(analysis.settings);
                    break;
                case 'icon':
                    result = await this.generateIconSet(analysis.settings);
                    break;
                case 'ui':
                    result = await this.generateUIKit(analysis.settings);
                    break;
                default:
                    result = await this.generateLogo(analysis.settings);
            }
            
            return result;
        } catch (error) {
            console.error('Error generating design:', error);
            return {
                success: false,
                error: error.message,
                message: 'ডিজাইন তৈরি করতে সমস্যা হয়েছে'
            };
        }
    }
    
    analyzeBrief(brief) {
        const text = brief.toLowerCase();
        
        // Simple keyword analysis
        if (text.includes('logo') || text.includes('লোগো')) {
            return {
                type: 'logo',
                settings: this.extractLogoSettings(text)
            };
        } else if (text.includes('icon') || text.includes('আইকন')) {
            return {
                type: 'icon',
                settings: this.extractIconSettings(text)
            };
        } else if (text.includes('ui') || text.includes('button') || text.includes('কার্ড')) {
            return {
                type: 'ui',
                settings: this.extractUISettings(text)
            };
        } else {
            return {
                type: 'logo',
                settings: this.extractLogoSettings(text)
            };
        }
    }
    
    extractLogoSettings(text) {
        const settings = {
            companyName: this.extractCompanyName(text),
            style: 'modern',
            colors: ['#6366F1', '#8B5CF6'],
            template: 'default',
            quality: 'high'
        };
        
        // Extract colors
        const colorMatches = text.match(/#[0-9A-Fa-f]{6}|blue|red|green|yellow|purple|pink|orange/gi);
        if (colorMatches) {
            settings.colors = this.convertColorNames(colorMatches.slice(0, 2));
        }
        
        // Extract style
        if (text.includes('minimal') || text.includes('মিনিমাল')) settings.style = 'minimal';
        if (text.includes('modern') || text.includes('মডার্ন')) settings.style = 'modern';
        if (text.includes('vintage') || text.includes('ভিনটেজ')) settings.style = 'vintage';
        
        // Extract template
        if (text.includes('tech') || text.includes('টেক')) settings.template = 'tech';
        if (text.includes('fashion') || text.includes('ফ্যাশন')) settings.template = 'fashion';
        if (text.includes('restaurant') || text.includes('রেস্টুরেন্ট')) settings.template = 'restaurant';
        if (text.includes('education') || text.includes('এডুকেশন')) settings.template = 'education';
        
        return settings;
    }
    
    extractCompanyName(text) {
        // Simple extraction - look for quoted text
        const quoted = text.match(/"([^"]+)"/);
        if (quoted) return quoted[1];
        
        // Look for patterns like "for [company name]"
        const forPattern = /for\s+([a-zA-Z0-9\s]+)/i;
        const match = text.match(forPattern);
        if (match) return match[1].trim();
        
        return 'Your Brand';
    }
    
    convertColorNames(colorNames) {
        const colorMap = {
            blue: '#3B82F6',
            red: '#EF4444',
            green: '#10B981',
            yellow: '#F59E0B',
            purple: '#8B5CF6',
            pink: '#EC4899',
            orange: '#F97316',
            black: '#000000',
            white: '#FFFFFF'
        };
        
        return colorNames.map(color => {
            const lowerColor = color.toLowerCase();
            return colorMap[lowerColor] || color;
        });
    }
    
    extractIconSettings(text) {
        return {
            type: 'social',
            style: 'filled',
            color: '#6366F1',
            count: 5
        };
    }
    
    extractUISettings(text) {
        return {
            type: 'default',
            colors: ['#6366F1', '#8B5CF6', '#10B981'],
            font: 'Inter'
        };
    }
}

// Initialize Vector Generator
const vectorGenerator = new VectorGenerator();

// Export to global scope
window.vectorGenerator = vectorGenerator;