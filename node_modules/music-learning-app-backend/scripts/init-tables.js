const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false
    }
);

// Modèles
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 50]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    progress: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

const Course = sequelize.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    level: {
        type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM('guitare', 'piano', 'batterie', 'chant', 'théorie musicale'),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    objectives: {
        type: DataTypes.JSON,
        allowNull: false
    },
    program: {
        type: DataTypes.JSON,
        allowNull: false
    },
    instructorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        }
    }
});

const Lesson = sequelize.define('Lesson', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    resources: {
        type: DataTypes.JSON,
        defaultValue: []
    }
});

const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    instructions: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    difficulty: {
        type: DataTypes.ENUM('débutant', 'intermédiaire', 'avancé'),
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    audioUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM('pratique', 'théorique', 'quiz'),
        allowNull: false
    }
});

const Payment = sequelize.define('Payment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatsapp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending'
    }
});

const UserProgress = sequelize.define('UserProgress', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'courses',
            key: 'id'
        }
    },
    lessonId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'lessons',
            key: 'id'
        }
    },
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lastAccessed: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

// Relations
Course.hasMany(Lesson);
Lesson.belongsTo(Course);

Course.hasMany(Exercise);
Exercise.belongsTo(Course);

User.belongsToMany(Course, { through: 'UserCourses' });
Course.belongsToMany(User, { through: 'UserCourses' });

Payment.belongsTo(User, { foreignKey: 'userId' });
Payment.belongsTo(Course, { foreignKey: 'courseId' });
User.hasMany(Payment, { foreignKey: 'userId' });
Course.hasMany(Payment, { foreignKey: 'courseId' });

User.hasMany(UserProgress, { foreignKey: 'userId' });
Course.hasMany(UserProgress, { foreignKey: 'courseId' });
Lesson.hasMany(UserProgress, { foreignKey: 'lessonId' });
UserProgress.belongsTo(User, { foreignKey: 'userId' });
UserProgress.belongsTo(Course, { foreignKey: 'courseId' });
UserProgress.belongsTo(Lesson, { foreignKey: 'lessonId' });

// Fonction d'initialisation
async function initTables() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données établie avec succès.');

        // Synchronisation des modèles avec la base de données
        await sequelize.sync({ force: true });
        console.log('Tables créées avec succès.');

        process.exit(0);
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des tables:', error);
        process.exit(1);
    }
}

initTables(); 