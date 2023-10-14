import { PrismaClient } from "@prisma/client";
import express from "express";
const prisma = new PrismaClient();
import ngrok from "ngrok";
import jsonwebtoken from "jsonwebtoken";

const app = express();
const port = 3000;
app.use(express.json()); //middleware to interpret all request body as json
const url = await ngrok.connect(3000); //tunnel for backend requests

const getUserFromToken = (token) => {
  const user = jsonwebtoken.verify(token, "secret");
  return user.data;
};

//checking if email is unique
app.post("/checkUniqueEmail", async (req, res) => {
  try {
    const body = req.body;

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    res.send(user == null ? "0" : "Email is already taken"); //0 for success, 1 for email taken
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

//checking if username is unique
app.post("/checkUniqueUsername", async (req, res) => {
  try {
    const body = req.body;

    const user = await prisma.user.findFirst({
      where: { username: body.username },
    });

    res.send(user == null ? "0" : "Username is already taken"); //0 for success, 1 for email taken
  } catch (error) {
    console.log(error);
    res.status(500);
    res.send(error);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUniqueOrThrow({
      where: { email: email, password: password },
    });

    if (user != null) {
      const token = jsonwebtoken.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            id: user.id,
            type: user.type,
            email: user.email,
            username: user.username,
          },
        },
        "secret"
      );
      console.log(token);
      res.send({
        authToken: token,
        user: { id: user.id, type: user.type },
      });
    }
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

//register
app.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: password,
        username: username,
      },
    });

    if (newUser != null) {
      const token = jsonwebtoken.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            id: newUser.id,
            type: newUser.type,
            email: newUser.email,
            username: newUser.username,
          },
        },
        "secret"
      );

      res.send({
        authToken: token,
        user: { id: newUser.id, type: newUser.type },
      });
    }

    // res.status(200); // 200 for success
    // res.send(`New user ${newUser.username} created!`);
  } catch (error) {
    res.status(500);
    res.send(error);
  }
});

//change user type
app.patch("/updateUserType", async (req, res) => {
  try {
    const user = getUserFromToken(req.headers.authorization);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        type: req.body.type,
      },
    });
    res.status(200);
    res.send("Success");
  } catch (err) {
    res.status(500);
    res.send(err);
  }
});

app.post("/selectInterests", async (req, res) => {
  try {
    const user = getUserFromToken(req.headers.authorization);
    const body = Object.keys(req.body).map((id) => ({ id: parseInt(id) })); // {id: name, id: name}
    const result = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        categories: {
          connect: body,
        },
      },
    });
    res.send("Success");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

const getUser = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    })
    return user
  }
  catch (err) {
    throw err
  }
}

app.get("/myProfile", async (req, res) => {
  try {
    const tokenUser = getUserFromToken(req.headers.authorization)
    const user = await getUser(tokenUser.id)
    res.send(user)
  } catch (err) {
    res.send(err)
  }
})

app.get("/users/:userId", async (req, res) => {
  try {
    const user = getUser(req.params.id)
    res.send(user)
  } catch (err) {
    res.send(err)
  }
})

app.get("/getInterests", async (req, res) => {
  try {
    const user = getUserFromToken(req.headers.authorization);
    const result = await prisma.user.findFirst({
      where: {
        id: user.id,
      },
      select: {
        categories: true,
      },
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/setProfileInformation", async(req, res) => {
  try {
  const tokenUser = getUserFromToken(req.headers.authorization)
  const user = await getUser(tokenUser.id)

  const profileAlreadyExists = await prisma.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  if (profileAlreadyExists) {
    try { 
      await prisma.profile.update({
        where: {
          userId: user.id
        },
        data: {
          name: req.body.name,
          location: req.body.location,
          occupation: req.body.occupation,
          bio: req.body.bio
        }
      })
      res.send("Success")
    } catch (err){
      throw err
    }
  } else {
      const newProfile = await prisma.profile.create({
        data: {
          user: {
            connect: { id: user.id}
          },
          name: req.body.name,
          location: req.body.location,
          occupation: req.body.occupation,
          bio: req.body.bio
        }
      });
      res.send(newProfile)
    }
  } catch (err){
    res.send(err)
  }
})

app.get("/getProfileInformation", async(req, res) => {
  try{
    const tokenUser = getUserFromToken(req.headers.authorization)
    const user = await getUser(tokenUser.id)
    const profile = await prisma.profile.findFirst({
      where: {
        userId: user.id
      },
    })
    res.send(profile)
  } catch (err){
    res.send(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
