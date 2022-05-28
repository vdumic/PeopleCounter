#ifndef Counter_h
#define Counter_h

#include <Arduino.h>
#include <HCSR04.h>

struct _num;
typedef struct _num {
    int peopleInside;
    int peopleOutside;
} peopleNum;

struct _count;
typedef struct _count {
    peopleNum personNum;
    float distanceIn;
    float distanceOut;
    int intervalMin;
    int intervalMax;
    long nextIn;
    long nextOut;
} counterStructure;

counterStructure counter_init();

boolean counter_inside(counterStructure currentState);

boolean counter_outside(counterStructure currentState);

void print_current_state(counterStructure currentState);


#endif
