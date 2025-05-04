const { Course, User, Lesson } = require('../models');

const courseController = {
  // Créer un nouveau cours
  async create(req, res) {
    try {
      console.log('📝 Création d\'un nouveau cours...');
      const { title, description, level, price, category } = req.body;
      const instructor_id = req.user.id;

      const course = await Course.create({
        title,
        description,
        level,
        price,
        instructor_id,
        category
      });

      console.log('✅ Cours créé avec succès');
      res.status(201).json({
        message: 'Cours créé avec succès',
        course
      });
    } catch (error) {
      console.error('❌ Erreur lors de la création du cours:', error);
      res.status(500).json({ message: 'Erreur lors de la création du cours' });
    }
  },

  // Récupérer tous les cours
  async getAll(req, res) {
    try {
      console.log('🔍 Récupération de tous les cours...');
      const courses = await Course.findAll({
        include: [
          {
            model: User,
            as: 'instructor',
            attributes: ['username', 'email']
          }
        ]
      });

      console.log(`✅ ${courses.length} cours récupérés`);
      res.json(courses);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des cours:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des cours' });
    }
  },

  // Récupérer un cours par son ID
  async getById(req, res) {
    try {
      console.log('🔍 Récupération du cours...');
      console.log('ID du cours demandé:', req.params.id);
      console.log('URL complète:', req.originalUrl);
      console.log('Méthode:', req.method);
      console.log('Headers:', req.headers);
      
      if (!req.params.id) {
        console.log('❌ ID du cours manquant');
        return res.status(400).json({
          success: false,
          message: 'ID du cours requis'
        });
      }

      // Vérifier si l'ID est un nombre valide
      const courseId = parseInt(req.params.id);
      if (isNaN(courseId)) {
        console.log('❌ ID du cours invalide:', req.params.id);
        return res.status(400).json({
          success: false,
          message: 'ID du cours invalide'
        });
      }

      console.log('Recherche du cours avec ID:', courseId);
      const course = await Course.findByPk(courseId, {
        include: [
          {
            model: User,
            as: 'instructor',
            attributes: ['id', 'username', 'email']
          },
          {
            model: Lesson,
            as: 'lessons',
            attributes: ['id', 'title', 'description', 'duration', 'lessonOrder', 'videoUrl']
          }
        ]
      });

      console.log('Résultat de la requête:', course ? 'Cours trouvé' : 'Cours non trouvé');

      if (!course) {
        console.log('❌ Cours non trouvé avec ID:', courseId);
        return res.status(404).json({ 
          success: false,
          message: 'Cours non trouvé',
          id: courseId
        });
      }

      console.log('✅ Cours récupéré avec succès');
      console.log('Données du cours:', JSON.stringify(course, null, 2));
      
      // Formater la réponse
      const formattedCourse = {
        success: true,
        data: {
          id: course.id,
          title: course.title,
          description: course.description,
          level: course.level,
          category: course.category,
          price: course.price,
          status: course.status,
          instructor: course.instructor ? {
            id: course.instructor.id,
            username: course.instructor.username,
            email: course.instructor.email
          } : null,
          lessons: course.lessons ? course.lessons.map(lesson => ({
            id: lesson.id,
            title: lesson.title,
            description: lesson.description,
            duration: lesson.duration,
            lessonOrder: lesson.lessonOrder,
            videoUrl: lesson.videoUrl
          })) : []
        }
      };

      console.log('Réponse formatée:', JSON.stringify(formattedCourse, null, 2));
      res.json(formattedCourse);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération du cours:', error);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ 
        success: false,
        message: 'Erreur lors de la récupération du cours',
        error: error.message
      });
    }
  },

  // Mettre à jour un cours
  async update(req, res) {
    try {
      console.log('📝 Mise à jour du cours...');
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.id) {
        console.log('❌ Non autorisé');
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await course.update(req.body);
      console.log('✅ Cours mis à jour avec succès');
      res.json(course);
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du cours:', error);
      res.status(500).json({ message: 'Erreur lors de la mise à jour du cours' });
    }
  },

  // Supprimer un cours
  async delete(req, res) {
    try {
      console.log('🗑️ Suppression du cours...');
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.id) {
        console.log('❌ Non autorisé');
        return res.status(403).json({ message: 'Non autorisé' });
      }

      await course.destroy();
      console.log('✅ Cours supprimé avec succès');
      res.json({ message: 'Cours supprimé avec succès' });
    } catch (error) {
      console.error('❌ Erreur lors de la suppression du cours:', error);
      res.status(500).json({ message: 'Erreur lors de la suppression du cours' });
    }
  },

  // Ajouter une leçon à un cours
  async addLesson(req, res) {
    try {
      console.log('📝 Ajout d\'une leçon au cours...');
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      if (course.instructor_id !== req.user.id) {
        console.log('❌ Non autorisé');
        return res.status(403).json({ message: 'Non autorisé' });
      }

      const lesson = await Lesson.create({
        course_id: course.id,
        ...req.body
      });

      console.log('✅ Leçon ajoutée avec succès');
      res.status(201).json({
        message: 'Leçon ajoutée avec succès',
        lesson
      });
    } catch (error) {
      console.error('❌ Erreur lors de l\'ajout de la leçon:', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout de la leçon' });
    }
  },

  // Récupérer les leçons d'un cours
  async getLessons(req, res) {
    try {
      console.log('🔍 Récupération des leçons du cours...');
      const course = await Course.findByPk(req.params.id);
      if (!course) {
        console.log('❌ Cours non trouvé');
        return res.status(404).json({ message: 'Cours non trouvé' });
      }

      const lessons = await Lesson.findAll({
        where: { course_id: course.id },
        order: [['lessonOrder', 'ASC']]
      });

      console.log(`✅ ${lessons.length} leçons récupérées`);
      res.json(lessons);
    } catch (error) {
      console.error('❌ Erreur lors de la récupération des leçons:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des leçons' });
    }
  }
};

module.exports = courseController; 