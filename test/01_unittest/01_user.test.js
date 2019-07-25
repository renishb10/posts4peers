// NOT YET COMPLETED
// NEED TO HANDLE ASYNC TEST USING DONE()
// Dependencies
const expect = require('chai').expect;

// Custom Dependencies
global.logger = require('../../helpers/logger').createCustLogger();

//////////////////////////////////////////////////////////
// Post model unit testing
//////////////////////////////////////////////////////////
describe('Unit Test: Post Entity', () => {
  const Post = require('../../models/post.model');
  before(async function(done) {
    //Clean up Post model
    done();
  });

  it('should be able to able to fetch posts', async () => {
    await Post.find({})
      .then(data => {
        if (data) {
          expect(data).to.be.an('array');
          expect(data[0]).to.have.property('title');
          expect(data[0]).to.have.property('body');
          expect(data[0]).to.have.property('author');
        } else expect(true).to.equal(true);
      })
      .catch(err => {
        expect(true).to.equal(false);
      });
  }).timeout(10000);
});
