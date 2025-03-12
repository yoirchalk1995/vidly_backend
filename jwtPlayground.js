const jwt = require("jsonwebtoken");

const verifyUser = async (jsonwt) => {
  const payload = await jwt.verify(jsonwt, "12345");
};

console.log(
  verifyUser(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2QxODk2MDljYzM4MDk5OTI5Y2MzMjQiLCJpYXQiOjE3NDE3ODU0NDB9.SMgau9SzgA7W-9fwl9Vu91VcRO0ROHna10cRi8pKEc0"
  )._id
);
