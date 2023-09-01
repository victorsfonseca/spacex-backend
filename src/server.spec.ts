import app from './server'
import request from 'supertest'

describe('Api endpoints', () =>{
    it('should return message: Fullstack Challenge 🏅 - Space X API', async () =>{
        const response = await request(app).get('/')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Fullstack Challenge 🏅 - Space X API')
    })
})