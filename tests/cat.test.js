/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../index');

chai.use(chaiHttp);

describe('API Tests', () => {
  let createdCat;
  let testCatLength;
  before(async () => {
    await chai
      .request(server)
      .post('/cats/create')
      .send({ name: 'jeff', colour: 'jeff', evil: true });

    const jsonCatArray = (await chai.request(server).get('/cats/getAll')).body;
    // console.log(jsonCatArray);
    testCatLength = jsonCatArray.length;
    createdCat = jsonCatArray[testCatLength - 1];
  });

  it(
    'Get all cats',
    (done) => {
      chai
        .request(server)
        .get('/cats/getAll')
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai
            .expect(res.body[testCatLength - 1])
            .to.include({
              _id: createdCat._id,
              name: createdCat.name,
              colour: createdCat.colour,
              evil: createdCat.evil,
            });
          chai.expect(res.status).to.equal(200);
          return done();
        });
    },
  );

  it(
    'Create a Cat',
    (done) => {
      chai
        .request(server)
        .post('/cats/create')
        .send({ name: 'jeff', colour: 'jeff', evil: true })
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai
            .expect(res.body)
            .to.include({ name: 'jeff', colour: 'jeff', evil: true });
          chai.expect(res.status).to.equal(201);
          return done();
        });
    },
  );

  it(
    'Update a Cat',
    (done) => {
      chai
        .request(server)
        .patch(`/cats/update/${createdCat._id}`)
        .query({ name: 'dave', colour: 'dave', evil: false })
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai.expect(res.body.modifiedCount).to.equal(1);
          chai.expect(res.status).to.equal(200);
          return done();
        });
    },
  );

  it(
    'Delete a Cat',
    (done) => {
      chai
        .request(server)
        .delete(`/cats/remove/${createdCat._id}`)
        .end((err, res) => {
          chai.expect(err).to.be.null;
          chai.expect(res.body.deletedCount).to.equal(1);
          chai.expect(res.status).to.equal(200);
          return done();
        });
    },
  );

  after(async () => {
    const newJsonCatArray = (await chai.request(server).get('/cats/getAll')).body;
    const newlyCreatedCat = newJsonCatArray[newJsonCatArray.length - 1];
    await chai.request(server).delete(`/cats/remove/${newlyCreatedCat._id}`);
    // console.log(createdCat._id);
    await mongoose.disconnect();
    console.log('DISCONNECTED');
  });
});
