const User = require('./models/User');

async function testUserOperations() {
  try {
    // Création d'un utilisateur test
    const userId = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      whatsapp: '+1234567890'
    });
    console.log('✅ Utilisateur créé avec l\'ID:', userId);

    // Récupération de l'utilisateur par email
    const userByEmail = await User.findByEmail('test@example.com');
    console.log('✅ Utilisateur trouvé par email:', userByEmail);

    // Récupération de l'utilisateur par ID
    const userById = await User.findById(userId);
    console.log('✅ Utilisateur trouvé par ID:', userById);

    // Mise à jour du profil
    await User.updateProfile(userId, {
      name: 'Test User Updated',
      whatsapp: '+0987654321'
    });
    console.log('✅ Profil utilisateur mis à jour');

    // Vérification du mot de passe
    const isPasswordValid = await User.comparePassword('password123', userByEmail.password);
    console.log('✅ Vérification du mot de passe:', isPasswordValid ? '✅ Correct' : '❌ Incorrect');

  } catch (error) {
    console.error('❌ Erreur lors des opérations utilisateur:', error);
  }
}

testUserOperations(); 