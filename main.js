// 图片数据
const galleryImages = [
    {
        id: 1,
        title: 'Love',
        category: 'life',
        thumbnail: 'we_img/微信图片_202504031236002.jpg',
        fullImage: 'we_img/微信图片_202504031236002.jpg',
        description: '爱是最美的瞬间'
    },
    {
        id: 2,
        title: 'Memory',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123430.jpg',
        fullImage: 'we_img/微信图片_20250403123430.jpg',
        description: '珍藏每一刻的回忆'
    },
    {
        id: 3,
        title: 'Happiness',
        category: 'life',
        thumbnail: 'we_img/微信图片_202504031236001.jpg',
        fullImage: 'we_img/微信图片_202504031236001.jpg',
        description: '幸福的笑容'
    },
    {
        id: 4,
        title: 'Sweet',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123428.jpg',
        fullImage: 'we_img/微信图片_20250403123428.jpg',
        description: '甜蜜的时光'
    },
    {
        id: 5,
        title: 'Together',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123600.jpg',
        fullImage: 'we_img/微信图片_20250403123600.jpg',
        description: '在一起的美好'
    },
    {
        id: 6,
        title: 'Joy',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123426.jpg',
        fullImage: 'we_img/微信图片_20250403123426.jpg',
        description: '欢乐的瞬间'
    },
    {
        id: 7,
        title: 'Romance',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123559.jpg',
        fullImage: 'we_img/微信图片_20250403123559.jpg',
        description: '浪漫的记忆'
    },
    {
        id: 8,
        title: 'Forever',
        category: 'life',
        thumbnail: 'we_img/微信图片_20250403123424.jpg',
        fullImage: 'we_img/微信图片_20250403123424.jpg',
        description: '永恒的约定'
    }
];

// DOM 元素
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-links a');
const sidebar = document.querySelector('.sidebar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const galleryGrid = document.querySelector('.gallery-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const passwordModal = document.getElementById('passwordModal');
const imageModal = document.getElementById('imageModal');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordBtn = document.getElementById('confirmPassword');
const cancelPasswordBtn = document.getElementById('cancelPassword');
const closeBtn = document.querySelector('.close-btn');
const previewImage = document.getElementById('previewImage');
const playSoundBtn = document.getElementById('playSound');
const toggleThemeBtn = document.getElementById('toggleTheme');

// 当前选中的图片
let currentImage = null;

// 音效和音乐
const welcomeSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
const backgroundMusic = new Audio('https://cdn.jsdelivr.net/gh/microsoft/TypeScript@main/tests/cases/user/background-music.mp3');
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1434/1434-preview.mp3');
const successSound = new Audio('https://assets.mixkit.co/active_storage/sfx/1433/1433-preview.mp3');

// 设置音量
welcomeSound.volume = 0.03; // 降低欢迎音效音量到10%
backgroundMusic.volume = 1.0; // 设置背景音乐初始音量为60%
clickSound.volume = 0.03; // 降低点击音效音量到10%
successSound.volume = 0.03; // 降低成功音效音量到10%

// 设置背景音乐循环播放
backgroundMusic.loop = true;

// 音乐控制
const toggleMusicBtn = document.getElementById('toggleMusic');
const volumeSlider = document.getElementById('volumeSlider');
let isMusicPlaying = false;

// 音量控制
volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    backgroundMusic.volume = volume;
    // 更新音量图标
    const icon = toggleMusicBtn.querySelector('i');
    if (volume === 0) {
        icon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        icon.className = 'fas fa-volume-down';
    } else {
        icon.className = 'fas fa-volume-up';
    }
});

function toggleBackgroundMusic() {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        toggleMusicBtn.innerHTML = '<i class="fas fa-volume-up"></i> 背景音乐';
    } else {
        backgroundMusic.play().catch(error => {
            console.error('播放音乐失败:', error);
            alert('播放音乐失败，请检查浏览器设置或刷新页面重试');
        });
        toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i> 背景音乐';
    }
    isMusicPlaying = !isMusicPlaying;
}

// 页面加载完成后自动播放背景音乐
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.play().catch(error => {
        console.error('自动播放音乐失败:', error);
    });
    isMusicPlaying = true;
    toggleMusicBtn.innerHTML = '<i class="fas fa-volume-mute"></i> 背景音乐';
});

// 播放点击音效
function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// 播放成功音效
function playSuccessSound() {
    successSound.currentTime = 0;
    successSound.play();
}

// 导航功能
function navigateToSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === sectionId) {
            section.classList.add('active');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// 移动端菜单
mobileMenuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// 导航链接点击事件
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        playClickSound();
        const sectionId = link.getAttribute('href').substring(1);
        navigateToSection(sectionId);
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// 加载相册图片
function loadGalleryImages(category = 'all') {
    galleryGrid.innerHTML = '';
    const filteredImages = category === 'all' 
        ? galleryImages 
        : galleryImages.filter(img => img.category === category);
    
    filteredImages.forEach(image => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${image.thumbnail}" alt="${image.title}" data-id="${image.id}">
        `;
        div.addEventListener('click', () => showPasswordModal(image));
        galleryGrid.appendChild(div);
    });
}

// 显示密码验证模态框
function showPasswordModal(image) {
    playClickSound();
    currentImage = image;
    passwordModal.style.display = 'flex';
    passwordInput.value = '';
}

// 验证密码
function verifyPassword() {
    if (passwordInput.value === currentImage.password) {
        passwordModal.style.display = 'none';
        showImagePreview(currentImage.fullImage);
        playSuccessSound();
        
        // 移除模糊效果
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(img => {
            if (img.getAttribute('data-id') === currentImage.id.toString()) {
                img.classList.add('visible');
            }
        });
    } else {
        alert('密码错误！');
        playClickSound();
    }
}

// 显示图片预览
function showImagePreview(imageUrl) {
    previewImage.src = imageUrl;
    imageModal.style.display = 'flex';
    
    // 设置定时器，3秒后自动关闭预览并恢复模糊
    setTimeout(() => {
        closeImagePreview();
        // 恢复图片模糊效果
        const galleryItems = document.querySelectorAll('.gallery-item img');
        galleryItems.forEach(img => {
            if (img.getAttribute('data-id') === currentImage.id.toString()) {
                img.classList.remove('visible');
            }
        });
    }, 3000);
}

// 关闭图片预览
function closeImagePreview() {
    imageModal.style.display = 'none';
    // 恢复图片模糊效果
    const galleryItems = document.querySelectorAll('.gallery-item img');
    galleryItems.forEach(img => {
        if (img.getAttribute('data-id') === currentImage.id.toString()) {
            img.classList.remove('visible');
        }
    });
}

// 相册筛选
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        playClickSound();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadGalleryImages(btn.dataset.filter);
    });
});

// 播放欢迎音效
playSoundBtn.addEventListener('click', () => {
    welcomeSound.play();
});

// 切换主题
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    toggleThemeBtn.innerHTML = `<i class="fas fa-${isDark ? 'sun' : 'moon'}"></i> 切换主题`;
}

// 事件监听
confirmPasswordBtn.addEventListener('click', verifyPassword);
cancelPasswordBtn.addEventListener('click', () => {
    passwordModal.style.display = 'none';
});
closeBtn.addEventListener('click', closeImagePreview);
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) {
        closeImagePreview();
    }
});
toggleThemeBtn.addEventListener('click', toggleTheme);
toggleMusicBtn.addEventListener('click', toggleBackgroundMusic);

// 添加动态背景效果
function createStarBackground() {
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars-container';
    document.body.appendChild(starsContainer);

    // 增加星星数量到200个
    for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        // 随机大小
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        // 随机动画延迟
        star.style.animationDelay = `${Math.random() * 5}s`;
        // 随机动画持续时间
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        starsContainer.appendChild(star);
    }
}

// 初始化动态背景
createStarBackground();

// 初始化
loadGalleryImages();

// 子页面数据
const subpages = {
    education: {
        title: '教育经历',
        sections: [
            {
                title: '大学教育',
                cards: [
                    {
                        title: '计算机科学与技术',
                        text: '主修课程：数据结构、算法分析、操作系统等',
                        image: 'image/微信图片_202408311055551.jpg'
                    },
                    {
                        title: '软件工程',
                        text: '主修课程：软件工程、数据库系统、Web开发等',
                        image: 'image/微信图片_20241109184712.jpg'
                    }
                ]
            }
        ]
    },
    skills: {
        title: '技能特长',
        sections: [
            {
                title: '编程语言',
                cards: [
                    {
                        title: 'JavaScript',
                        text: '熟练掌握前端开发技术，包括React、Vue等框架',
                        image: 'image/微信图片_20250121100935.jpg'
                    },
                    {
                        title: 'Python',
                        text: '擅长数据处理和机器学习应用开发',
                        image: 'image/微信图片_20250121101254.jpg'
                    }
                ]
            },
            {
                title: '开发工具',
                cards: [
                    {
                        title: 'Git',
                        text: '熟练使用Git进行版本控制和团队协作',
                        image: 'image/微信图片_20250123084300.jpg'
                    }
                ]
            }
        ]
    },
    experience: {
        title: '工作经历',
        sections: [
            {
                title: '实习经历',
                cards: [
                    {
                        title: '前端开发实习',
                        text: '负责公司官网改版和移动端适配',
                        image: 'image/微信图片_202408311055551.jpg'
                    },
                    {
                        title: '全栈开发实习',
                        text: '参与企业级应用开发，负责后端API设计和实现',
                        image: 'image/微信图片_20241109184712.jpg'
                    }
                ]
            }
        ]
    },
    hobbies: {
        title: '兴趣爱好',
        sections: [
            {
                title: '摄影',
                cards: [
                    {
                        title: '风景摄影',
                        text: '喜欢用相机记录大自然的美丽瞬间',
                        image: 'image/sky-cloud-mountain-snow-blue-world-2076343-wallhere.com_waifu2x_photo_noise3.png'
                    },
                    {
                        title: '人像摄影',
                        text: '擅长捕捉人物表情和情感',
                        image: 'image/trees-landscape-mountains-lake-water-nature-786271-wallhere.com.jpg'
                    }
                ]
            },
            {
                title: '旅行',
                cards: [
                    {
                        title: '户外探险',
                        text: '热爱户外运动，喜欢探索未知的地方',
                        image: 'image/cloud-water-sky-mountain-water-resources-plant-2078981-wallhere.com.jpg'
                    }
                ]
            }
        ]
    },
    programming: {
        title: '编程笔记',
        sections: [
            {
                title: '前端开发',
                cards: [
                    {
                        title: 'React最佳实践',
                        text: '总结React开发中的常见问题和解决方案',
                        image: 'image/微信图片_20250121100935.jpg'
                    },
                    {
                        title: 'CSS技巧',
                        text: '分享实用的CSS布局和动画技巧',
                        image: 'image/微信图片_20250121101254.jpg'
                    }
                ]
            }
        ]
    },
    reading: {
        title: '读书笔记',
        sections: [
            {
                title: '技术书籍',
                cards: [
                    {
                        title: '《JavaScript高级程序设计》',
                        text: '深入理解JavaScript核心概念',
                        image: 'image/微信图片_20250123084300.jpg'
                    }
                ]
            }
        ]
    },
    web: {
        title: 'Web项目',
        sections: [
            {
                title: '个人项目',
                cards: [
                    {
                        title: '个人博客系统',
                        text: '使用React和Node.js开发的现代化博客系统',
                        image: 'image/微信图片_202408311055551.jpg'
                    },
                    {
                        title: '在线笔记应用',
                        text: '支持Markdown编辑的云笔记应用',
                        image: 'image/微信图片_20241109184712.jpg'
                    }
                ]
            }
        ]
    },
    contact: {
        title: '联系我',
        sections: [
            {
                title: '联系方式',
                cards: [
                    {
                        title: 'QQ联系方式',
                        text: '点击查看我的QQ号',
                        image: 'image/微信图片_202408311055551.jpg',
                        type: 'contact',
                        password: ['6', '6', '6', '6']
                    },
                    {
                        title: '个人照片',
                        text: '点击查看我的照片',
                        image: 'image/微信图片_20241109184712.jpg',
                        type: 'photo',
                        password: ['0', '5', '1', '6']
                    }
                ]
            }
        ]
    }
};

// 子页面容器
const subpageContainer = document.getElementById('subpage-container');

// 九宫格密码验证
let passwordSequence = [];
let currentCard = null;
let isVerifying = false;

// 创建九宫格验证弹窗
function createGridModal(card) {
    currentCard = card;
    const modal = document.createElement('div');
    modal.className = 'modal grid-modal';
    modal.innerHTML = `
        <div class="modal-content grid-content">
            <h2>输入密码哟~</h2>
            <div class="grid-container">
                <div class="grid-item" data-value="1">1</div>
                <div class="grid-item" data-value="2">2</div>
                <div class="grid-item" data-value="3">3</div>
                <div class="grid-item" data-value="4">4</div>
                <div class="grid-item" data-value="5">5</div>
                <div class="grid-item" data-value="6">6</div>
                <div class="grid-item" data-value="7">7</div>
                <div class="grid-item" data-value="8">8</div>
                <div class="grid-item" data-value="0">0</div>
            </div>
            <div class="password-display">${passwordSequence.join('')}</div>
            <div class="modal-buttons">
                <button class="btn" onclick="closeGridModal()">取消</button>
                <button class="btn" onclick="clearPassword()">清除</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

// 显示九宫格验证弹窗
function showGridModal(card) {
    const modal = createGridModal(card);
    modal.style.display = 'flex';
    
    // 添加点击事件
    modal.querySelectorAll('.grid-item').forEach(item => {
        item.addEventListener('click', () => {
            if (isVerifying) return;
            const value = item.getAttribute('data-value');
            passwordSequence.push(value);
            item.classList.add('selected');
            
            // 更新显示
            modal.querySelector('.password-display').textContent = passwordSequence.join('');
            
            // 检查密码
            if (passwordSequence.length === currentCard.password.length) {
                isVerifying = true;
                if (passwordSequence.join('') === currentCard.password.join('')) {
                    setTimeout(() => {
                        modal.remove();
                        if (currentCard.type === 'contact') {
                            showContactInfo();
                        } else if (currentCard.type === 'photo') {
                            showPhotoPreview();
                        }
                    }, 500);
                } else {
                    setTimeout(() => {
                        clearPassword();
                        alert('密码错误，请重试！');
                    }, 500);
                }
            }
        });
    });
}

// 清除密码
function clearPassword() {
    passwordSequence = [];
    isVerifying = false;
    const modal = document.querySelector('.grid-modal');
    if (modal) {
        modal.querySelector('.password-display').textContent = '';
        modal.querySelectorAll('.grid-item').forEach(item => {
            item.classList.remove('selected');
        });
    }
}

// 关闭九宫格验证弹窗
function closeGridModal() {
    const modal = document.querySelector('.grid-modal');
    if (modal) {
        modal.remove();
        passwordSequence = [];
        isVerifying = false;
    }
}

// 显示联系方式
function showContactInfo() {
    const contactCard = document.querySelector('.subpage-card[data-type="contact"]');
    if (contactCard) {
        contactCard.querySelector('.subpage-card-text').innerHTML = `
            <p>我的QQ号：<span class="highlight">1480778564</span></p>
            <p>欢迎添加好友交流！</p>
        `;
    }
}

// 显示照片预览
function showPhotoPreview() {
    const photoCard = document.querySelector('.subpage-card[data-type="photo"]');
    if (photoCard) {
        const img = photoCard.querySelector('img');
        const modal = document.createElement('div');
        modal.className = 'modal romantic-gallery-modal';
        modal.innerHTML = `
            <div class="modal-content romantic-gallery-content">
                <span class="close-btn">&times;</span>
                <div class="romantic-gallery-header">
                    <div class="header-decoration">
                        <span class="heart-decoration">❤</span>
                        <h2>Our Sweet Moments</h2>
                        <span class="heart-decoration">❤</span>
                    </div>
                    <p class="romantic-subtitle">每一张照片都是我们甜蜜的回忆</p>
                    <div class="header-line"></div>
                    <div class="interactive-controls">
                        <button class="theme-toggle" title="切换主题">
                            <span class="theme-icon">🌙</span>
                        </button>
                        <button class="music-toggle" title="播放音乐">
                            <span class="music-icon">🎵</span>
                        </button>
                        <button class="slideshow-toggle" title="幻灯片播放">
                            <span class="slideshow-icon">▶</span>
                        </button>
                    </div>
                </div>
                <div class="romantic-gallery-container">
                    <div class="romantic-gallery-main">
                        <div class="romantic-gallery-featured">
                            <div class="featured-image">
                                <img src="${galleryImages[0].fullImage}" alt="${galleryImages[0].title}">
                                <div class="image-caption">
                                    <h3>${galleryImages[0].title}</h3>
                                    <p>${galleryImages[0].description}</p>
                                </div>
                            </div>
                        </div>
                        <div class="romantic-gallery-grid">
                            ${galleryImages.slice(1).map((image, index) => `
                                <div class="romantic-gallery-item" data-index="${index + 1}">
                                    <img src="${image.fullImage}" alt="${image.title}">
                                    <div class="romantic-gallery-overlay">
                                        <span class="heart-icon">❤</span>
                                    </div>
                                    <div class="image-caption">
                                        <h3>${image.title}</h3>
                                        <p>${image.description}</p>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="romantic-gallery-sidebar">
                        <div class="memory-counter">
                            <span class="counter-number">${galleryImages.length}</span>
                            <span class="counter-text">张照片</span>
                        </div>
                        <div class="memory-quote">
                            <p>"爱是最美的语言，照片是最好的见证"</p>
                        </div>
                        <div class="memory-stats">
                            <div class="stat-item">
                                <span class="stat-icon">❤</span>
                                <span class="stat-number">${galleryImages.length * 2}</span>
                                <span class="stat-text">颗心</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-icon">📸</span>
                                <span class="stat-number">${galleryImages.length}</span>
                                <span class="stat-text">张照片</span>
                            </div>
                        </div>
                        <div class="memory-calendar">
                            <h3>甜蜜时光线</h3>
                            <div class="timeline">
                                ${galleryImages.map((image, index) => `
                                    <div class="timeline-item">
                                        <span class="timeline-date">2024.04.03</span>
                                        <span class="timeline-title">${image.title}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.style.display = 'flex';
        
        // 添加交互功能
        setupGalleryInteractions(modal);
        
        // 添加关闭事件
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}

// 设置画廊交互功能
function setupGalleryInteractions(modal) {
    // 主题切换
    const themeToggle = modal.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.setAttribute('data-theme', 
            document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        themeToggle.querySelector('.theme-icon').textContent = 
            document.body.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    });

    // 音乐控制
    const musicToggle = modal.querySelector('.music-toggle');
    musicToggle.addEventListener('click', () => {
        isMusicPlaying = !isMusicPlaying;
        musicToggle.querySelector('.music-icon').textContent = isMusicPlaying ? '⏸' : '🎵';
        // 这里可以添加音乐播放/暂停逻辑
    });

    // 幻灯片播放
    const slideshowToggle = modal.querySelector('.slideshow-toggle');
    let slideshowInterval;
    slideshowToggle.addEventListener('click', () => {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
            slideshowToggle.querySelector('.slideshow-icon').textContent = '▶';
        } else {
            slideshowInterval = setInterval(() => {
                const featuredImage = modal.querySelector('.featured-image img');
                const currentIndex = galleryImages.findIndex(img => img.fullImage === featuredImage.src);
                const nextIndex = (currentIndex + 1) % galleryImages.length;
                featuredImage.src = galleryImages[nextIndex].fullImage;
                modal.querySelector('.image-caption h3').textContent = galleryImages[nextIndex].title;
                modal.querySelector('.image-caption p').textContent = galleryImages[nextIndex].description;
            }, 3000);
            slideshowToggle.querySelector('.slideshow-icon').textContent = '⏸';
        }
    });

    // 图片点击放大
    const galleryItems = modal.querySelectorAll('.romantic-gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.dataset.index);
            const featuredImage = modal.querySelector('.featured-image img');
            featuredImage.src = galleryImages[index].fullImage;
            modal.querySelector('.image-caption h3').textContent = galleryImages[index].title;
            modal.querySelector('.image-caption p').textContent = galleryImages[index].description;
        });
    });
}

// 加载子页面
function loadSubpage(pageId) {
    const page = subpages[pageId];
    if (!page) return;

    const content = `
        <div class="subpage-header">
            <h1 class="subpage-title">${page.title}</h1>
            <a href="#" class="subpage-back" onclick="closeSubpage()">
                <i class="fas fa-arrow-left"></i> 返回
            </a>
        </div>
        <div class="subpage-content">
            ${page.sections.map(section => `
                <div class="subpage-section">
                    <h2 class="subpage-section-title">${section.title}</h2>
                    <div class="subpage-grid">
                        ${section.cards.map(card => `
                            <div class="subpage-card" data-type="${card.type || ''}">
                                <img src="${card.image}" alt="${card.title}">
                                <div class="subpage-card-content">
                                    <h3 class="subpage-card-title">${card.title}</h3>
                                    <p class="subpage-card-text">${card.text}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    subpageContainer.innerHTML = content;
    subpageContainer.classList.add('active');
    document.body.style.overflow = 'hidden';

    // 为联系页面卡片添加点击事件
    if (pageId === 'contact') {
        const cards = subpageContainer.querySelectorAll('.subpage-card');
        cards.forEach(card => {
            card.addEventListener('click', () => {
                const cardType = card.getAttribute('data-type');
                const cardData = page.sections[0].cards.find(c => c.type === cardType);
                if (cardData) {
                    showGridModal(cardData);
                }
            });
        });
    }
}

// 关闭子页面
function closeSubpage() {
    subpageContainer.classList.remove('active');
    document.body.style.overflow = '';
}

// 更新菜单点击事件
document.querySelectorAll('.menu-link, .submenu a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        if (pageId) {
            loadSubpage(pageId);
            // 在移动端点击后关闭侧边栏
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        }
    });
}); 