const mongoose = require('mongoose')
const User = require('./models/User')
const Event = require('./models/Event')
const Comment = require('./models/Comment')
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

// Create sample users
const users = [
    { name: 'Carolyn Flowers', email: 'tus@titma.do', password: 'password123' },
    { name: 'Sara Ruiz', email: 'kidulipa@diniheh.cz', password: 'password123' },
    { name: 'Edna Norris', email: 'bupke@bol.sx', password: 'password123' },
    { name: 'Lettie Brown', email: 'vitac@kid.re', password: 'password123' },
    { name: 'Barry Boone', email: 'huslot@bo.pl', password: 'password123' },
    { name: 'Micheal Underwood', email: 'cevmune@mu.cg', password: 'password123' },
    { name: 'Leroy Mills', email: 'cu@udovunic.tc', password: 'password123' },
    { name: 'Bobby Sims', email: 'si@iba.gw', password: 'password123' },
    { name: 'Dean Reyes', email: 'haapjac@hahufo.li', password: 'password123' },
    { name: 'Bill Harrison', email: 'ibsadag@zebfompan.nl', password: 'password123' },
]

// Create sample events
const events = [
    { title: 'Tech Conference 2024', description: 'Join us for the annual Tech Conference where industry leaders share insights on the latest technological advancements and trends. Network with professionals and gain valuable knowledge to stay ahead in the tech world.', date: new Date('2024-08-15T09:00:00.000Z'), user: users[0]._id },
    { title: 'Art Exhibition: Modern Masters', description: 'Explore the works of contemporary artists at the Modern Masters art exhibition. This event features a diverse collection of paintings, sculptures, and digital art from renowned artists around the world.', date: new Date('2024-09-10T18:00:00.000Z'), user: users[1]._id },
    { title: 'Culinary Workshop: Italian Cuisine', description: 'Discover the secrets of Italian cooking in this hands-on culinary workshop. Learn how to prepare authentic dishes from experienced chefs and enjoy a delicious meal that you create.', date: new Date('2024-10-05T12:00:00.000Z'), user: users[2]._id },
    { title: 'Music Festival: Rock the Night', description: 'Get ready to rock the night away at our annual music festival. Enjoy live performances from popular rock bands and artists, along with food stalls, merchandise, and more.', date: new Date('2024-11-20T19:00:00.000Z'), user: users[3]._id },
    { title: 'Charity Run: Run for a Cause', description: 'Participate in our charity run and help raise funds for a noble cause. Whether you are a seasoned runner or a beginner, this event is open to all. Join us for a day of fitness and philanthropy.', date: new Date('2024-12-05T08:00:00.000Z'), user: users[4]._id },
    { title: 'Book Fair 2024', description: 'Join us at the annual Book Fair, where you can find books from various genres and meet your favorite authors. A must-attend event for book lovers!', date: new Date('2024-07-25T10:00:00.000Z'), user: users[5]._id },
    { title: 'Fitness Bootcamp', description: 'Kickstart your fitness journey with our intensive bootcamp sessions. Designed for all fitness levels, our bootcamp will help you achieve your health goals.', date: new Date('2024-08-20T07:00:00.000Z'), user: users[6]._id },
    { title: 'Photography Workshop', description: 'Learn the art of photography from professionals in this immersive workshop. Perfect for beginners and enthusiasts looking to enhance their skills.', date: new Date('2024-09-15T14:00:00.000Z'), user: users[7]._id },
    { title: 'Startup Pitch Night', description: 'Pitch your startup ideas to a panel of investors and industry experts. Network with fellow entrepreneurs and get valuable feedback on your business plans.', date: new Date('2024-10-10T17:00:00.000Z'), user: users[8]._id },
    { title: 'Gaming Tournament', description: 'Compete in our annual gaming tournament and show off your skills. Prizes for the top performers and fun for everyone!', date: new Date('2024-11-05T13:00:00.000Z'), user: users[9]._id },
]

// Create sample comments
const comments = [
    { text: 'Great event!', user: users[0]._id, event: events[0]._id },
    { text: 'Looking forward to it.', user: users[1]._id, event: events[1]._id },
    { text: 'Can\'t wait!', user: users[2]._id, event: events[2]._id },
    { text: 'Amazing lineup!', user: users[3]._id, event: events[3]._id },
    { text: 'Excited for this!', user: users[4]._id, event: events[4]._id },
    { text: 'This is going to be fun!', user: users[5]._id, event: events[5]._id },
    { text: 'Looking forward to meeting everyone.', user: users[6]._id, event: events[6]._id },
    { text: 'Great opportunity to learn.', user: users[7]._id, event: events[7]._id },
    { text: 'Can\'t wait to pitch my idea.', user: users[8]._id, event: events[8]._id },
    { text: 'I\'m in!', user: users[9]._id, event: events[9]._id },
]

async function populate() {
    try {
        // Clear existing data
        await User.deleteMany();
        await Event.deleteMany();
        await Comment.deleteMany();

        // Insert users
        const insertedUsers = await User.insertMany(users);

        // Insert events
        events[0].createdBy = insertedUsers[0]._id;
        events[1].createdBy = insertedUsers[1]._id;
        const insertedEvents = await Event.insertMany(events);

        // Insert comments
        comments[0].createdBy = insertedUsers[0]._id;
        comments[0].event = insertedEvents[0]._id;
        comments[1].createdBy = insertedUsers[1]._id;
        comments[1].event = insertedEvents[1]._id;
        await Comment.insertMany(comments);

        console.log('Data successfully populated');
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
}

populate();