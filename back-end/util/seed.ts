import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { set } from 'date-fns';
import { UserSettings } from '../model/userSettings';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.deleteMany();
    await prisma.post.deleteMany();
    await prisma.course.deleteMany();

    const courses = [
        {
            name: 'Beginner knitted cast-on',
            difficultyLevel: 1,
            length: 1,
            rating: 9,
            description: 'Learn how to cast on and begin your project.',
            materials: ['Wooden needles', 'Yarn'],
            instructions: [
                'Make a slip knot and put it on your needle.',
                'Hold this needle in your left hand and take the second needle in your right hand.',
                'Pass the needle in the right hand through the loop on the left needle.',
                'With your left hand, wrap the working yarn around your left hand.',
                'Bring the right needle back through the loop on the left needle.',
                'Now you have a loop around your right needle. Turn the loop and pull.',
                'Pull the yarn and you have two stitches casted on.',
                'To continue, repeat from step 2.',
            ],
        },
        {
            name: 'Making your first patchwork square',
            difficultyLevel: 1,
            length: 1,
            rating: 8,
            description: 'Learn how to create a little square patch.',
            materials: [
                'Light worsted yarn (American)/DK (UK)/8 ply (Aus)',
                '100 grams (3.5 oz) in any combination of colours',
                '4.50mm/US 7 needles',
                'Yarn sewing needle',
            ],
            instructions: [
                'Cast on enough stitches to make 8” (20cm).',
                'Row 1: knit, Row 2: knit.',
                'Continue knitting until the square measures 8" (20cm).',
                'Cast off/bind off. Leave a 20″ (50cm) tail for sewing.',
            ],
        },
        {
            name: 'How to make a beanie',
            difficultyLevel: 3,
            length: 6,
            rating: 6,
            description: 'Learn how to create a basic beanie.',
            materials: [
                'US 11 16-inch circular needle',
                '100 to 110 yards size 5 bulky weight yarn',
                'Stitch marker (optional)',
                'Scissors',
                'Yarn sewing needle',
            ],
            instructions: [
                'Cast on 64 stitches with the knit cast-on method.',
                'Join the stitches to knit in the round, ensuring none are twisted.',
                'Place a marker if desired, to track rounds.',
                'Shape the top of the hat using decrease stitches.',
                'Cut the yarn, leaving a tail for finishing.',
            ],
        },
        {
            name: 'How to knit in the round',
            difficultyLevel: 2,
            length: 1,
            rating: 8,
            description: 'Learn how to knit in the round.',
            materials: ['US 11 16-inch circular needle', 'Yarn of your choice', 'Stitch marker'],
            instructions: [
                'Cast on using your preferred method onto the circular needle.',
                'Make sure the working yarn is on the right needle.',
                'Place a stitch marker on your needle.',
                'Knit into the first stitch of the left needle and continue knitting.',
                'When done, weave in the tail from your cast-on yarn.',
            ],
        },
        {
            name: 'How to switch colours in a patch',
            difficultyLevel: 2,
            length: 1,
            rating: 4,
            description: 'Make colourful pieces by switching yarn colours.',
            materials: ['4.50mm/US 7 needles', '2 yarn colours'],
            instructions: [
                'Make a little loop hook with your second yarn colour.',
                'Knit the second yarn colour through.',
                'Continue knitting with the new yarn colour.',
            ],
        },
        {
            name: 'How to knit a table mat',
            difficultyLevel: 2,
            length: 2,
            rating: 4,
            description: 'Create a knitted table mat.',
            materials: [
                'Cotton yarn (or yarn suitable for placemats)',
                'Knitting needles appropriate for yarn weight',
                'Scissors',
                'Tapestry needle for weaving in ends',
            ],
            instructions: [
                'Cast on the number of stitches needed for the width of your placemat.',
                'Begin knitting the placemat using your preferred stitch pattern.',
                'Continue knitting until the placemat reaches the desired length.',
                'Bind off all stitches and weave in loose ends.',
            ],
        },
        {
            name: 'How to knit a patchwork blanket',
            difficultyLevel: 2,
            length: 30,
            rating: 7,
            description: 'Make a patchwork blanket with square patches.',
            materials: [
                '8 colours of yarn',
                'Knitting needles appropriate for your yarn weight',
                'Scissors',
                'Tapestry needle for weaving in ends',
            ],
            instructions: [
                'Refer to the "Making your first patchwork square" course to create squares.',
                'Place squares you want to join together.',
                'Sew the squares together using a threaded needle.',
                'Weave in the ends.',
            ],
        },
        {
            name: 'How to knit a pair of socks',
            difficultyLevel: 5,
            length: 10,
            rating: 9,
            description: 'Make a pair of custom socks.',
            materials: [
                '100-150 grams of fingering weight sock yarn',
                'Double-pointed knitting needles size 2.50 mm',
                'Scissors',
                'Tapestry needle for weaving in ends',
                'Measuring tape',
            ],
            instructions: [
                'Cast on 30 stitches and knit 30 rows in plain stockinette stitch.',
                'Wash and block your finished swatch.',
                'Measure stitches per inch and calculate the required cast-on stitches.',
                'Cast on using two needles and join in the round.',
                'Knit in a 2×2 rib for 5 cm/2 in.',
                'Continue to shape the cuff and sock.',
            ],
        },
        {
            name: 'How to knit a scarf',
            difficultyLevel: 2,
            length: 4,
            rating: 9,
            description: 'Make a custom scarf.',
            materials: [
                'Yarn appropriate for needle size',
                'Size 15 / 10 mm knitting needles',
                'Scissors',
                'Tapestry needle for weaving in ends',
            ],
            instructions: [
                'Cast on 16 stitches.',
                'Knit every stitch using the knit stitch.',
                'Repeat knitting rows until the desired length.',
                'Bind off using the standard cast-off method.',
            ],
        },
        {
            name: 'How to knit an egg cosy',
            difficultyLevel: 2,
            length: 2,
            rating: 7,
            description: 'Make a custom egg cosy!',
            materials: [
                'Yarn (100% wool, 50g/125m)',
                '3½mm knitting needles',
                'Scissors',
                'Tapestry needle for weaving in ends',
            ],
            instructions: [
                'Cast on 37 stitches.',
                'Join to knit in the round, ensuring stitches are not twisted.',
                'Shape the top with decrease stitches.',
                'Cut the yarn, leaving a tail for finishing.',
            ],
        },
    ];

    // Insert all courses into the database
    await prisma.course.createMany({
        data: courses,
    });

    const defaultUserSettings = await prisma.userSettings.create({
        data: {
            id: 1,
            theme: 'dark',
            notificationsEnabled: true,
            language: 'en',
        },
    });

    const course1 = await prisma.course.create({
        data: {
            name: 'how to make a nice hat',
            difficultyLevel: 2,
            length: 120,
            rating: 4,
            description: 'Make a custom egg cosy!',
            materials: [
                'Yarn (100% wool, 50g/125m)',
                '3½mm knitting needles',
                'Scissors',
                'Tapestry needle for weaving in ends',
            ],
            instructions: [
                'Cast on 37 stitches.',
                'Join to knit in the round, ensuring stitches are not twisted.',
                'Shape the top with decrease stitches.',
                'Cut the yarn, leaving a tail for finishing.',
            ],
        },
    });

    await prisma.user.create({
        data: {
            username: 'The God of Knitting',
            password: 'god123',
            age: 3,
            email: 'godofknitting@myspace.com',
            bio: 'hey guys I am here to learn knitting',
            creationDate: new Date(),
            userSettings: {
                connect: { id: defaultUserSettings.id },
            },
            courses: {
                connect: { id: course1.id },
            },
        },
    });

    const post1 = await prisma.post.create({
        data: {
            likes: 0,
            description: 'My first Post !',
            uploadDate: new Date(),
            user: {
                connect: { id: 1 }, // Connect to user with ID 1
            },
            course: {
                connect: { id: course1.id }, // Correctly associate the post with the course
            },
        },
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
