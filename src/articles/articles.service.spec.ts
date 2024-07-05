import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


//1. Arrange inputs and targets. Arrange steps should set up the test case. Does the test require any objects or special settings? Does it need to prep a database? Does it need to log into a web app? Handle all of these operations at the start of the test.
//2. Act on the target behavior. Act steps should cover the main thing to be tested. This could be calling a function or method, calling a REST API, or interacting with a web page. Keep actions focused on the target behavior.
//3. Assert expected outcomes. Act steps should elicit some sort of response. Assert steps verify the goodness or badness of that response. Sometimes, assertions are as simple as checking numeric or string values. Other times, they may require checking multiple facets of a system. Assertions will ultimately determine if the test passes or fails.

// Ask yourself: "What is the intended behavior here? Are there multiple paths the code can go down?"

// describe('createTweet', () => {
//   it('should create tweet', () => {
//      Arrange
//     service.tweets = [];
//     const payload = 'This is my tweet';

//      Act
//     const tweet = service.createTweet(payload);

//      Assert
//     expect(tweet).toBe(payload);
//     expect(service.tweets).toHaveLength(1);
//   });

//   it('should prevent tweets created which are over 100 characters', () => {
//     // Arrange
//     const payload =
//       'This is a long tweet over 100 characters This is a long tweet over 100 characters This is a long t...';

//     // Act
//     const tweet = () => {
//       return service.createTweet(payload);
//     };

//     // Assert
//     expect(tweet).toThrowError();
//   });

 