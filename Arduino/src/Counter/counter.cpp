#include "counter.h"

HCSR04 hcIn(26, 27); //initialisation class HCSR04 (trig pin , echo pin)
HCSR04 hcOut(16, 17); //initialisation class HCSR04 (trig pin , echo pin)


counterStructure counter_init() {
    counterStructure initialState;

    initialState.intervalMin = 200;
    initialState.intervalMax = 1000;
    initialState.nextIn = initialState.nextOut = 0;

    // Setting initial distance for counting people going in
    initialState.distanceIn =  hcIn.dist();

    // Setting initial distance for counting people going out
    initialState.distanceOut = hcOut.dist();

    Serial.print("Initial distance in: ");
    Serial.println(initialState.distanceIn);

    Serial.print("Initial distance out: ");
    Serial.println(initialState.distanceOut);

    initialState.personNum.peopleInside = 0;
    initialState.personNum.peopleOutside = 0;

    return initialState;
}

boolean counter_inside(counterStructure currentState) {

    if (hcIn.dist() < currentState.distanceIn * 0.75) {
        currentState.personNum.peopleInside++;
        return true;
    }

    return false;
}

boolean counter_outside(counterStructure currentState) {

    if (hcOut.dist() < currentState.distanceOut * 0.75) {
        currentState.personNum.peopleOutside++;
        return true;
    }

    return false;
}

void print_current_state(counterStructure currentState) {

    Serial.print("People inside: ");
    Serial.println(currentState.personNum.peopleInside);

    Serial.print("People outside: ");
    Serial.println(currentState.personNum.peopleOutside);

    Serial.print("People in the room: ");
    Serial.println(currentState.personNum.peopleInside - currentState.personNum.peopleOutside);
}