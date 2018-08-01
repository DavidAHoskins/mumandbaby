class User {
    static currentUser = "defaultUser";
    static currentPage = "defaultUser";
    static lastLoadDate = null;

    //other relevant code here
	static getCurrentPage() {
        return this.currentPage;
    }
    static setCurrentPager(str:String) {
        this.currentPage = str;
    }
    static getCurrentUser() {
        return this.currentUser;
    }
    static setCurrentUser(str:String) {
        this.currentUser = str;
    }
}

export default User;