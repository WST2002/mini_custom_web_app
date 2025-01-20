const db = require('../databaseConnection/dbConnect');

const checkPlanValidity = (userId) => {
    return new Promise((resolve, reject) => {
        db.execute('CALL GetUserDetails(?)', [userId], (err, results) => {
            if (err) return reject(err);

            const user = results[0][0];

            if (user.plan === 'free') {
                const currentDate = new Date();
                const planUpdatedAt = new Date(user.planUpdatedAt);
                const planExpiryDate = new Date(planUpdatedAt);
                planExpiryDate.setDate(planExpiryDate.getDate() + 7);

                if (currentDate > planExpiryDate) {
                    db.execute('CALL DeactivatePlanBasedOnUserId(?)', [userId]);
                    resolve('no');
                } else {
                    resolve(user.plan);
                }
            } else if (['silver', 'gold', 'platinum'].includes(user.plan)) {
                const currentDate = new Date();
                const planUpdatedAt = new Date(user.planUpdatedAt);
                const planExpiryDate = new Date(planUpdatedAt);
                planExpiryDate.setFullYear(planExpiryDate.getFullYear() + 1);

                if (currentDate > planExpiryDate) {
                    db.execute('CALL DeactivatePlanBasedOnUserId(?)', [userId]);
                    resolve('no'); // Update plan to 'no' and resolve
                } else {
                    resolve(user.plan); // If not expired, resolve with current plan
                }
            } else {
                resolve(user.plan); // If the plan doesn't match any conditions, resolve as is
            }
        });
    });
};

module.exports = checkPlanValidity;