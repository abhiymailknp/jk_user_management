const SWAGGER_CONSTANTS = {
    swagger: {
      title: 'User-Management',
      description: 'User Management_API',
      version: '1.0',
      tag: 'NestJs , User Management',
    },
  };
  
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

  enum Role {
    admin,
    editor,
    viewer
  } 
  
  export {
    SWAGGER_CONSTANTS,
    passwordRegex,
    Role,
} ;