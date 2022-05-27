#include "counter.h"

// Structure with wich we are counting people
counterStructure countPeople;

void setup()
{
  Serial.begin (9600);

  // Initialising counter values
  countPeople = counter_init();
}

void loop() {

  long now = millis();
  boolean result = false;

  if (now > countPeople.nextIn) {

    // Checking if someone is going inside
    result = counter_inside(countPeople);
   
    // Reassigning next time to check for people
    if (result) {
      // Doing it for both in and out because we don't want same person to be counted two times from two different sensors
      countPeople.nextOut = now + countPeople.intervalMax;
      countPeople.nextIn = now + countPeople.intervalMax;
    } else {
      countPeople.nextIn = now + countPeople.intervalMin;
    }
  }

  if (now > countPeople.nextOut) {

    // Checking if someone is going outside
    result = counter_outside(countPeople);

    // Reassigning next time to check for people
    if (result) {
      // Doing it for both in and out because we don't want same person to be counted two times from two different sensors
      countPeople.nextIn = now + countPeople.intervalMax;
      countPeople.nextOut = now + countPeople.intervalMax;
    } else {
      countPeople.nextOut = now + countPeople.intervalMin;
    }
  }

  int currentNumber = countPeople.personNum.peopleInside - countPeople.personNum.peopleOutside;

  print_current_state(countPeople);
}