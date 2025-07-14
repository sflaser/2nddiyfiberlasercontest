// SKYFIRE Competition - Firebase Alternative Configuration
// 
// Firebase Realtime Database - 免费替代方案
// 如果 Supabase 有权限问题，可以使用这个方案

// Firebase 配置 (已更新)
const firebaseConfig = {
    apiKey: "AIzaSyChF4dC12lMm8giTs99WJBXIQQKQ9SIx_g",
    authDomain: "skyfire-contest-2.firebaseapp.com",
    databaseURL: "https://skyfire-contest-2-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "skyfire-contest-2",
    storageBucket: "skyfire-contest-2.firebasestorage.app",
    messagingSenderId: "108866306876​2",
    appId: "1:108866306876​2:web:785eb5a44fb5100b397863"
};

// 简单的数据操作函数
const ParticipantFirebase = {
    // 获取所有参与者
    async getAll() {
        try {
            const response = await fetch(`${firebaseConfig.databaseURL}/participants.json`);
            const data = await response.json();
            
            if (!data) return [];
            
            // 转换 Firebase 格式到数组
            return Object.keys(data).map(key => ({
                id: key,
                ...data[key]
            }));
        } catch (error) {
            console.error('Error fetching participants:', error);
            return [];
        }
    },

    // 添加参与者
    async add(participant) {
        try {
            const response = await fetch(`${firebaseConfig.databaseURL}/participants.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...participant,
                    created_at: new Date().toISOString()
                })
            });
            
            const result = await response.json();
            return { id: result.name, ...participant };
        } catch (error) {
            console.error('Error adding participant:', error);
            throw error;
        }
    },

    // 更新参与者
    async update(id, updates) {
        try {
            const response = await fetch(`${firebaseConfig.databaseURL}/participants/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates)
            });
            
            return await response.json();
        } catch (error) {
            console.error('Error updating participant:', error);
            throw error;
        }
    },

    // 删除参与者
    async delete(id) {
        try {
            await fetch(`${firebaseConfig.databaseURL}/participants/${id}.json`, {
                method: 'DELETE'
            });
            return true;
        } catch (error) {
            console.error('Error deleting participant:', error);
            throw error;
        }
    }
};

// 检查 Firebase 是否配置
const isFirebaseConfigured = firebaseConfig.apiKey !== 'YOUR_FIREBASE_API_KEY';

// 使 Firebase 配置全局可用
window.isFirebaseConfigured = isFirebaseConfigured;
window.ParticipantFirebase = ParticipantFirebase;

if (!isFirebaseConfigured) {
    console.warn('Firebase not configured. Please update firebase-config.js');
} 