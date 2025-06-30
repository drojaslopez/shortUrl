
import { describe, expect, it, vi} from "vitest";
import request from 'supertest';
import app from '../middleware/app';



describe('User Controller', () => {
  describe('GET /users', () => {
    it('should return a list of users', async () => {
      const mockUsers: User[] = [{ id: 1, name: 'John Doe', email: 'john@example.com' }];
      (userService.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUsers);
    });
  });

  describe('POST /users', () => {
    it('should create a new user', async () => {
      const newUser: User = { id: 2, name: 'Jane Doe', email: 'jane@example.com' };
      (userService.createUser as jest.Mock).mockResolvedValue(newUser);

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newUser);
    });
  });
});

//jest.mock('../src/module/url/service');

vi.mock("../../src/module/url/schema", () =>{
  return{
   urlModel:{     
    findAll: vi.fn(async () => [
      {
        "id": "fe0989f7-acac-4c35-87a4-1221555adae7",
        "email": "test1@test.com",
        "password": "1234",
        "fullname": "Test User 1",
        "profile": "Administrador"
    },
    {
        "id": "04eb6627-055a-4d07-936f-1ef60a5408bf",
        "email": "daniel2@drl.cl",
        "password": "$2a$10$mAriFOJ0/qrmJaePTWXwdOqPes4rtQ9NAHXiRa8iQy1gyxrP.XRKG",
        "fullname": "Daniel Rojas",
        "profile": "Usuario"
    },
    ]),
    findOneById:vi.fn(async (id) => {
      return { 
        "id": "04eb6627-055a-4d07-936f-1ef60a5408bf",
        "email": "daniel2@drl.cl",
        "password": "$2a$10$mAriFOJ0/qrmJaePTWXwdOqPes4rtQ9NAHXiRa8iQy1gyxrP.XRKG",
        "fullname": "Daniel Rojas",
        "profile": "Usuario"
    };
    }),
    findByEmail: vi.fn(async (id) => {
      return { 
        "id": "04eb6627-055a-4d07-936f-1ef60a5408bf",
        "email": "daniel@test.com",
        "password": "$2a$10$mAriFOJ0/qrmJaePTWXwdOqPes4rtQ9NAHXiRa8iQy1gyxrP.XRKG",
        "fullname": "Daniel Rojas",
        "profile": "Usuario"
    };
    })
   }
  }
})

describe("GET /user", () => {
  it("should return users", async () => {
   const {status, body} = await request(app).get("/api/v1/user");
   console.log(body);
   expect(status).toBe(200)
  });
}); 

describe("GET /user/id", () => {
  it("should return users", async () => {
  const userID = "04eb6627-055a-4d07-936f-1ef60a5408bf";
  const {status, body} = await request(app).get(`/api/v1/user/${userID}`);
  console.log(body);
  expect(status).toBe(200)   
  expect(body.id).toBe(userID);
  }); 
}); 

describe("GET /user/email", () => {  
      it("should return users", async () => {
      const userEmail = "daniel@test.com";
      const {status, body} = await request(app).get(`/api/v1/user/email/${userEmail}`);
      console.log(body);
      expect(status).toBe(200)
      expect(body.email).toBe(userEmail);
    }); 
});
