# BooKings

BooKings is a simple application that manages the CRUD operations of a Booking entity.

The backend is mocked with miragejs, so there is not a real database.

#### Instructions

To run the applicacion, clone the repository in your computer, and go to the root directory of the cloned repository. You will need to run the following commands:

(It is recommend that you are using the latest version of npm and node)

First, you will need to create a .env file with the following variable:

```
NODE_END = "development"
```

Then, run this command:

```
npm i && npm run dev
```

If everything went correctly, the application should be running on `http://localhost:5173`

#### Use with docker

If you want to run the application with Docker, you have two options:

- You can clone the repository in your computer and run this commands:

  ```
  docker build -t barrel_booking .
  ```

- Or you can build the docker image directly from this repository:

  ```
  docker build https://github.com/albert-araque/barrel_booking.git barrel_booking
  ```

After one of the two commands above, finally run this command:

```
  docker run -dp 5173:5173 barrel_booking
```
