const admin = require('firebase-admin');

module.exports = function(req, res) {

    if (!req.body.phone || !req.body.code) {
        return res.status(422).send({ error: 'Phone and Code are required.' });
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, '');
    const code = parseInt(req.body.code);

    admin.auth().getUser(phone)
                .then(() => {

                    const ref = admin.database().ref('users/' + phone);

                    ref.on('value', snapshot => {

                        ref.off();

                        const user = snapshot.val();

                        if (!user.isCodeValid && user.code !== code) {
                            return res.status(422).send({ error: 'Invalid code.' });
                        }

                        ref.update({ isCodeValid: false });

                        admin.auth().createCustomToken(phone)
                                    .then(token => { return res.status(200).send({ token: token}); })

                    });

                }).catch(err => {
                    res.status(422).send({ error: err });
                });

}
