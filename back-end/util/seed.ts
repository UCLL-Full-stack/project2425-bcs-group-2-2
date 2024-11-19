import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { UserSettings } from '../model/userSettings';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.userSettings.deleteMany();
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.course.deleteMany();

    const defaultUserSettings = await prisma.userSettings.create({
        data: {
            id: 1,
            theme: "dark",
            notificationsEnabled: true,
            language: "en"
        }
    });

    const course1 = await prisma.course.create({
        data: {
          name: "how to make a nice hat",
          difficultyLevel: 2,
          length: 120,
          rating: 4,
        },
    });

    

    await prisma.user.create({
        data: {
            name: 'The God of Knitting',
            password: "god123",
            age: 3,
            email: "godofknitting@myspace.com",
            bio: "hey guys I am here to learn knitting",
            creationDate: new Date(),
            userSettings: {
                connect: { id: defaultUserSettings.id },
            },
            courses: {
                connect: { id: course1.id }
            },
            
        },
    });

    const post1 = await prisma.post.create({
        data: {
            likes: 0,
            description: "My first Post !",
            uploadDate: new Date(),
            user: {
                connect: { id: 1 },  // Connect to user with ID 1
            },
            course: {
                connect: { id: course1.id }, // Correctly associate the post with the course
            },
        }
    });
};

(async () => {
    try {
        await main();
        await prisma.$disconnect();
    } catch (error) {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    }
})();
