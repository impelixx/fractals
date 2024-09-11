#include "../headers/complexnum.h"
#include <cmath>

// constructor

ComplexNum::ComplexNum(double real, double imag) {
    this->real = real;
    this->imag = imag;
}

// operator overloading

ComplexNum ComplexNum::operator+(const ComplexNum& other) {
    return ComplexNum(this->real + other.real, this->imag + other.imag);
}

ComplexNum ComplexNum::operator*(const ComplexNum& other) {
  return ComplexNum(this->real * other.real - this->imag * other.imag, this->real * other.imag + this->imag * other.real);
}

ComplexNum ComplexNum::operator-(const ComplexNum& other) {
    return ComplexNum(this->real - other.real, this->imag - other.imag);
}

ComplexNum ComplexNum::operator/(const ComplexNum& other) {
    double denominator = other.real * other.real + other.imag * other.imag;
    return ComplexNum((this->real * other.real + this->imag * other.imag) / denominator, (this->imag * other.real - this->real * other.imag) / denominator);
}

// function

double ComplexNum::abs() {
    return sqrt(this->real * this->real + this->imag * this->imag);
}

double ComplexNum::abs2() {
    return this->real * this->real + this->imag * this->imag;
}

// setter and getter methods

double ComplexNum::getReal() {
    return this->real;
}

double ComplexNum::getImag() {
    return this->imag;
}

void ComplexNum::setReal(double real) {
    this->real = real;
}

void ComplexNum::setImag(double imag) {
    this->imag = imag;
}
