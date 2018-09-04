const { Query } = require("./query");
const { Mutation } = require("./mutation");
const { Subscription } = require("./Subscription");
const { Association } = require("./association");

module.exports = [Query, Mutation, Association];
