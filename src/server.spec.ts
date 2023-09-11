import { MainController } from './controller/main.controller';
import 'reflect-metadata';
import request from 'supertest'
import { Server } from './server';
import { IMainBusiness } from './contract/business/iMain.business';
import { mock } from 'ts-jest-mocker'
import { ILaunchBusiness } from './contract/business/iLaunch.business';
import { LaunchController } from './controller/launches.controller';
import { Launch } from './model/launch.model';

describe('Api endpoints', () =>{

    describe('Main Controller', () => {
        let mainBusiness = mock<IMainBusiness>()
        let mainController = new MainController(mainBusiness)
        const routes = [{path: '/', router: mainController.router}]
        const server = new Server(routes)
        beforeAll(() =>{
            server.run()
        })
        afterAll(()=>{
            server.stop()
        })
        it('should return message: Fullstack Challenge 🏅 - Space X API', async () =>{
            mainBusiness.getWelcomeMessage.mockReturnValue( Promise.resolve({message: 'Fullstack Challenge 🏅 - Space X API'}) ) 
            const response = await request(server.app).get('/')
            expect(response.status).toBe(200)
            expect(response.body.message).toBe('Fullstack Challenge 🏅 - Space X API')
        })
        it('should return message: Error message', async () =>{
            mainBusiness.getWelcomeMessage.mockRejectedValue( { message: 'Error message' } )
            const response = await request(server.app).get('/')
            expect(response.statusCode).toBe(400)
            expect(response.body.message).toBe('Error message')
        })
    })

    describe('Launch Controller', () => {
        let launchBusiness = mock<ILaunchBusiness>()
        let launchController = new LaunchController(launchBusiness)
        const routes = [{path: '/launches', router: launchController.router}]
        const server = new Server(routes)
        beforeAll(() =>{
            server.run()
        })
        afterAll(()=>{
            server.stop()
        })

        describe('/launches', () => {
            it('should return empty results', async () =>{
                launchBusiness.getAll.mockResolvedValue({
                    results: [],
                    totalDocs: 0,
                    page: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false
                })

                const response = await request(server.app).get('/launches')
                expect(response.statusCode).toBe(200)
                expect(response.body.results).toHaveLength(0)
                expect(response.body.totalDocs).toBe(0)
                expect(response.body.page).toBe(1)
                expect(response.body.totalPages).toBe(1)
                expect(response.body.hasNext).toBeFalsy()
                expect(response.body.hasPrev).toBeFalsy()
            })

            it('should return correct results', async () =>{
                const results: Launch[] = [
                    {
                        "id": "5eb87cdbffd86e000604b32c",
                        "flightNumber": 3,
                        "name": "Trailblazer",
                        "launchDate": new Date("2008-08-03T03:34:00.000Z"),
                        "rocket": {
                          "id": "5e9d0d95eda69955f709d1eb",
                          "name": "Falcon 1"
                        },
                        "success": false,
                        "youtubeCode": "v0w9p3U8860",
                        "patch": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png"
                      },
                      {
                        "id": "5eb87cd9ffd86e000604b32a",
                        "flightNumber": 1,
                        "name": "FalconSat",
                        "launchDate": new Date("2006-03-24T22:30:00.000Z"),
                        "rocket": {
                          "id": "5e9d0d95eda69955f709d1eb",
                          "name": "Falcon 1"
                        },
                        "success": false,
                        "youtubeCode": "0a_00nJ_Y88",
                        "patch": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png"
                      }
                ]
                const resultsExpected = [
                    {
                        "id": "5eb87cdbffd86e000604b32c",
                        "flightNumber": 3,
                        "name": "Trailblazer",
                        "launchDate": "2008-08-03T03:34:00.000Z",
                        "rocket": {
                          "id": "5e9d0d95eda69955f709d1eb",
                          "name": "Falcon 1"
                        },
                        "success": false,
                        "youtubeCode": "v0w9p3U8860",
                        "patch": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png"
                      },
                      {
                        "id": "5eb87cd9ffd86e000604b32a",
                        "flightNumber": 1,
                        "name": "FalconSat",
                        "launchDate": "2006-03-24T22:30:00.000Z",
                        "rocket": {
                          "id": "5e9d0d95eda69955f709d1eb",
                          "name": "Falcon 1"
                        },
                        "success": false,
                        "youtubeCode": "0a_00nJ_Y88",
                        "patch": "https://images2.imgbox.com/eb/0f/Vev7xkUX_o.png"
                      }
                ]
                launchBusiness.getAll.mockResolvedValue({
                    results: results,
                    totalDocs: 2,
                    page: 1,
                    totalPages: 1,
                    hasNext: false,
                    hasPrev: false
                })

                const response = await request(server.app).get('/launches')
                expect(response.statusCode).toBe(200)
                expect(response.body.results).toEqual(expect.arrayContaining(resultsExpected))
                expect(response.body.totalDocs).toBe(2)
                expect(response.body.page).toBe(1)
                expect(response.body.totalPages).toBe(1)
                expect(response.body.hasNext).toBeFalsy()
                expect(response.body.hasPrev).toBeFalsy()
            })

            it('should return error message', async () =>{
                launchBusiness.getAll.mockRejectedValue({message: 'Error message'})

                const response = await request(server.app).get('/launches')

                expect(response.statusCode).toBe(400)
                expect(response.body.message).toBe('Error message')
            })
        })

        describe('/launches/stats', () => {
            it('should return error message', async () =>{
                launchBusiness.getStats.mockRejectedValue({message: 'Error message'})
                const response = await request(server.app).get('/launches/stats')
                expect(response.statusCode).toBe(400)
                expect(response.body.message).toBe('Error message')
            })
        })
    })
})