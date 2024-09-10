#include <complexnum.h>

ComplexNum::ComplexNum(double real, double imag) {
  this->real = real;
  this->imag = imag;
}
ComplexNum::ComplexNum operator+(const ComplexNum& other) {
  return ComplexNum(this->real + other.real, this->imag + other.imag);
}

ComplexNum::ComplexNum operator*(const ComplexNum& other) {
  return ComplexNum(this->real * other.real - this->imag * other.imag,
                    this->real * other.imag + this->imag * other.real);
}

ComplexNum::ComplexNum operator-(const ComplexNum& other) {
  return ComplexNum(this->real - other.real, this->imag - other.imag);
}

ComplexNum::double abs() {
  return sqrt(this->real * this->real + this->imag * this->imag);
}

ComplexNum::abs2() {
  return this->real * this->real + this->imag * this->imag;
}

ComplexNum::double getReal() {
  return this->real;
}

ComplexNum::double getImag() {
  return this->imag;
}

ComplexNum::void setReal(double real) {
  this->real = real;
}

ComplexNum::void setImag(double imag) {
  this->imag = imag;
}
