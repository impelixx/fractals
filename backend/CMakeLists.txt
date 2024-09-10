cmake_minimum_required(VERSION 3.26)
project(back)

set(CMAKE_CXX_STANDARD 17)

add_executable(back main.cpp
                    complexnum.h
                    complexnum.cpp)
