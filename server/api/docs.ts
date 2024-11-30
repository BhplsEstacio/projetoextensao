import swaggerJSDoc from "swagger-jsdoc";

export default defineEventHandler(async (event) => {
    const swaggerDefinition = {
        openapi: "3.0.0",
        info: {
            title: "Nuxt ToDo Documentation",
            version: "1.0.0",
        },
        servers: [{ url: "/api" }],
        schemes:
            process.env.SWAGGER_SCHEMA_HTTPS === "true"
                ? ["https"]
                : ["http", "https"],
        components: {
            schemas: {
                UserCreateDTO: {
                    type: "object",
                    properties: {
                        name: {
                            required: true,
                            type: "string",
                            example: "John Doe"
                        },
                        login: {
                            required: true,
                            type: "string",
                            example: "johndoe"
                        },
                        email: {
                            required: true,
                            type: "string",
                            example: "johndoe@email.com"
                        },
                        password: {
                            required: true,
                            type: "string",
                            example: "12345678"
                        }
                    }
                },
                UserAuthDTO: {
                    type: "object",
                    properties: {
                        credential: {
                            required: true,
                            type: "string",
                            example: "johndoe"
                        },
                        password: {
                            required: true,
                            type: "string",
                            example: "12345678"
                        }
                    }
                },
                UserNameUpdateDTO: {
                    type: "object",
                    properties: {
                        name: {
                            required: true,
                            type: "string",
                            example: "John Doe"
                        }
                    }
                },
                CategoryCreateDTO: {
                    type: "object",
                    properties: {
                        name: {
                            required: true,
                            description: "Name of category",
                            type: "string",
                            example: "Category 1"
                        }
                    }
                },
                TaskCreateDTO: {
                    type: "object",
                    properties: {
                        name: {
                            required: true,
                            description: "Name of task",
                            type: "string",
                            example: "Task"
                        },
                        description: {
                            required: true,
                            description: "Description of task",
                            type: "string",
                            example: "Task description"
                        },
                        status: {
                            required: false,
                            description: "Status of task",
                            type: "string",
                            enum: [
                                'TODO',
                                'PAUSED',
                                'DOING',
                                'DONE'
                            ],
                            example: "TODO"
                        },
                        deadline: {
                            required: false,
                            description: "Deadline date of task",
                            type: "string",
                            format: "date-time",
                            example: new Date().toISOString()
                        },
                        categories: {
                            required: false,
                            description: "Categories of task",
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/CategoryCreateDTO",
                            }
                        }
                    }
                },
                TaskUpdateDTO: {
                    type: "object",
                    properties: {
                        name: {
                            required: true,
                            description: "Name of task",
                            type: "string",
                            example: "Task"
                        },
                        description: {
                            required: true,
                            description: "Description of task",
                            type: "string",
                            example: "Task description"
                        },
                        status: {
                            required: false,
                            description: "Status of task",
                            type: "string",
                            enum: [
                                'TODO',
                                'PAUSED',
                                'DOING',
                                'DONE'
                            ],
                            example: "TODO"
                        },
                        deadline: {
                            required: false,
                            description: "Deadline date of task",
                            type: "string",
                            format: "date-time",
                            example: new Date().toISOString()
                        },
                        finished: {
                            required: false,
                            description: "Finished date of task",
                            type: "string",
                            format: "date-time",
                            example: new Date().toISOString()
                        },
                        categories: {
                            required: false,
                            description: "Categories of task",
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/CategoryCreateDTO",
                            }
                        }
                    }
                },
            },
            securitySchemes: {
                Authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: "JWT"
                }
            },
        }
    };

    const options = {
        swaggerDefinition,
        apis: ["server/api/**/*.ts"],
    };

    return swaggerJSDoc(options);
});