/**
 * @swagger
 * definitions:
 *   request_basic:
 *     type: object
 *     properties:
 *       intent:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string 
 *       userRequest:
 *         type: object
 *         properties:
 *           timezone:
 *             type: string
 *           params:
 *             properties:
 *               ignoreMe:
 *                 type: string
 *           block:
 *             properties:
 *               id:
 *                 type: string
 *               name:
 *                 type: string  
 *           utterance:
 *             type: string
 *           lang:
 *             type: string
 *           user:      
 *             properties:
 *               id:
 *                 type: string
 *               type:
 *                 type: string
 *               properties:
 *                 type: object  
 *       bot:
 *         type: object
 *         properties:
 *           id:
 *             type: string
 *           name:
 *             type: string
 *       action:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           clientExtra:
 *             type: string
 *           params:
 *             type: object
 *           id:
 *             type: string
 *           detailParams:
 *             type: object
 */

//Swagger
module.exports = {
		  swaggerDefinition: {
		    // 정보
		    info: {
		      title: 'NaTaBee',
		      version: '1.0.0',
		      description: '인하공전 도우미 챗봇 NaTaBee API'
		    },
		    // 주소
		    host: "3.35.143.128:8080",
		    // 기본 root path
		    basePath: "/natabee",
		    contact: {
		      email: "iustron@naver.com"
		    },
		    schemes: ["http", "https"] // 가능한 통신 방식
		  },
		  apis: ['./routes/*.js'] // api 파일 위치들 
		};