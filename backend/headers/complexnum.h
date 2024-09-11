#pragma once

class ComplexNum {
  public:
    ComplexNum(double real, double imag);
    ComplexNum operator+(const ComplexNum& other);
    ComplexNum operator*(const ComplexNum& other);
    ComplexNum operator-(const ComplexNum& other);
    ComplexNum operator/(const ComplexNum& other);
    double abs();
    double abs2();
    double getReal();
    double getImag();
    void setReal(double real);
    void setImag(double imag);
  private:
    double real;
    double imag;
};