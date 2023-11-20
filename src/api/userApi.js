import firebase from 'firebase/compat/app'

const userApi = {
  getMe: () => {
    // TODO: call API to get current user
    // temp: fake call API cause not have userAPI at this time
    return new Promise((resolve, reject) => {
      // reject(new Error('MY CUSTOM ERROR'));
      // return;

      // Wait 500ms --> return result
      setTimeout(() => {
        const currentUser = firebase.auth().currentUser;

        resolve({
          id: currentUser.id,
          name: currentUser.displayName,
          email: currentUser.email,
          photoUrl: currentUser.photoURL
        })
      }, 500);
    });
  }
};

export default userApi;
