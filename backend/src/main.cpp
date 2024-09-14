#include <iostream>
#include <string>
#include <cmath>
#include "../includes/httplib.h"
#include "../includes/json.h"
#include "../headers/complexnum.h"

using json = nlohmann::json;

int calculateMandelbrotIterations(double x, double y, int maxIter) {
    ComplexNum z(0.0, 0.0);
    ComplexNum c(x, y);

    int iter = 0;
    while (z.abs() <= 2.0 && iter < maxIter) {
        z = z * z + c; // z(n+1) = z(n)^2 + c
        ++iter;
    }

    return iter;
}

int main() {
    httplib::Server svr;
    svr.set_post_routing_handler([](const auto& req, auto& res) {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Headers", "*");
    });
    svr.Get("/point", [](const httplib::Request& req, httplib::Response& res) {
        if (req.has_param("x") && req.has_param("y")) {
            double x = std::stod(req.get_param_value("x"));
            double y = std::stod(req.get_param_value("y"));
            std::cout << "Point: (" << x << ", " << y << ")" << std::endl;
            int maxIter = 1000;
            if (req.has_param("maxIter")) {
                maxIter = std::stoi(req.get_param_value("maxIter"));
            }   
            int iterations = calculateMandelbrotIterations(x, y, maxIter);

            json response;
            response["iterations"] = iterations;
            res.set_content(response.dump(), "application/json");
        } else {
            res.status = 400;
            res.set_content("{\"error\": \"Missing parameters 'x' or 'y'\"}", "application/json");
        }
    });

    std::cout << "Server is running on http://localhost:8080/point" << std::endl;

    svr.listen("localhost", 8080);

    return 0;
}