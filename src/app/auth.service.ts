export class AuthService {
    /**
     * this is jsut a fake service
     * In a real application, this might reach out to a server
     * and allow us to login or logout and check our current authentication state
     * 
     * This one should always deny us access.
     */

    loggedIn = false;

    isauthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout( () => {
                    // resolve the promise and return this.loggedin
                    resolve(this.loggedIn);
                }, 800)
            }
        );

        return promise;
    }

    login() {
        this.loggedIn = true;
    }

    logout() {
        this.loggedIn = false;
    }
}