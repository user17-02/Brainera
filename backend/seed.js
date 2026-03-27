const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing courses
        await Course.deleteMany({});
        console.log('Cleared existing courses.');

        // Create a fake instructor if none exists
        let instructor = await User.findOne({ role: 'instructor' });
        if (!instructor) {
            instructor = new User({
                name: 'Brainera Instructor',
                email: 'instructor@brainera.com',
                password: 'password123',
                role: 'instructor'
            });
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            instructor.password = await bcrypt.hash(instructor.password, salt);
            await instructor.save();
            console.log('Created a default instructor: instructor@brainera.com / password123');
        }

        // Create a fake admin if none exists
        let admin = await User.findOne({ role: 'admin' });
        if (!admin) {
            admin = new User({
                name: 'Brainera Admin',
                email: 'admin@brainera.com',
                password: 'admin123',
                role: 'admin'
            });
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            admin.password = await bcrypt.hash(admin.password, salt);
            await admin.save();
            console.log('Created a default admin: admin@brainera.com / admin123');
        }

        const courses = [
            {
                title: 'Modern Web Development with React',
                description: 'Master the art of building modern web applications with React.js, from basics to advanced patterns.',
                category: 'Development',
                price: 49.99,
                duration: '12 hours',
                level: 'Beginner',
                thumbnail: '/uploads/images/react-js.png',
                status: 'published',
                instructor: instructor._id
            },
            {
                title: 'Data Science Fundamentals',
                description: 'Learn the core concepts of data science using Python, including data analysis, visualization, and machine learning.',
                category: 'Data Science',
                price: 69.99,
                duration: '15 hours',
                level: 'Intermediate',
                thumbnail: '/uploads/images/data-science.png',
                status: 'published',
                instructor: instructor._id
            },
            {
                title: 'UI/UX Design Masterclass',
                description: 'Understand the principles of good design and user experience to create stunning digital products.',
                category: 'Design',
                price: 39.99,
                duration: '10 hours',
                level: 'Beginner',
                thumbnail: '/uploads/images/ui-ux.png',
                status: 'published',
                instructor: instructor._id
            }
        ];

        await Course.insertMany(courses);
        console.log('Successfully seeded 3 courses!');
        process.exit();
    } catch (err) {
        console.error('Seeding failed:', err.message);
        process.exit(1);
    }
};

seedData();
