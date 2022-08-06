export class UserInfo {
    constructor({
        nameSelector,
        aboutSelector,
        avatar,
        id
    }) {
        this.name = document.querySelector(nameSelector);
        this.about = document.querySelector(aboutSelector);
        this.avatar = document.querySelector(avatar);
        this.id = id;
    }

    getUserInfo() {
        return {
            name: this.name.textContent,
            about: this.about.textContent,
            id: this.id,
        }
    }

    setUserInfo({
        name,
        about,
        avatar
    }) {
        this.name.textContent = name;
        this.about.textContent = about;
        
        if (avatar) {
            this.avatar.src = avatar;
        }
    }

}
