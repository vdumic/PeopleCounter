CREATE TABLE peopleCounter(
    id SERIAL PRIMARY KEY,
    peopleInside INT,
    peopleOutside INT,
    time TIMESTAMP NOT NULL DEFAULT now()
);