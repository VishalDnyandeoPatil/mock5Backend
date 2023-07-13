const express = require("express")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")

require('dotenv').config()

const { employeeModel } = require("../models/employee")

const routerEmployee = express.Router()

routerEmployee.post('/employees', async (req, res) => {

    try {

        const { firstName, lastName, email, department, salary } = req.body;

        const presentEmployee = await employeeModel.findOne({ firstName })

        if (presentEmployee) {

            return res.status(201).json({ message: 'Employee already present in database' });

        }

        const addnNewEmployee = new employeeModel({

            firstName,

            lastName,

            email,

            department,

            salary,

        });

        await addnNewEmployee.save();

        return res.status(201).json({ message: 'Employee added successfully' });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Internal server error' });

    }

});

routerEmployee.get('/dashboard', async (req, res) => {

    try {

        const { singlePage } = req.query;

        const pageDataSize = 5;

        const employeeTotal = await employeeModel.countDocuments();

        const indexStart = (singlePage - 1) * pageDataSize;

        const indexEnd = singlePage * pageDataSize;

        const employeesData = await EmployModel.find().skip(indexStart).limit(pageDataSize);

        return res.json({ employees: employeesData, employeeTotal }, { msg: "Employee sucessfully get" });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Server error' });

    }

});

routerEmployee.patch('/employes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const { firstName, lastName, email, department, salary } = req.body;

        const singleDataemployee = await employeeModel.findByIdAndUpdate(req.params.id, req.params.body);

        if (!singleDataemployee) {

            return res.status(404).json({ message: "employe not found in database" });

        }

        return res.json({ message: 'Employee data updated successfully' });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Server error' });

    }

});

routerEmployee.delete('/employes/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const { firstName, lastName, email, department, salary } = req.body;

        const removeEmpolyee = await employeeModel.findByIdAndDelete(id);

        if (!removeEmpolyee) {

            return res.status(404).json({ message: "employe is not found in database" });

        }

        return res.json({ message: 'Employee successfully deleted' });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Server error' });

    }

});

routerEmployee.get('/dashboard/filter', async (req, res) => {

    try {

        const { department } = req.query;

        const employeeFilter = await employeeModel.find({ department });

        return res.json({ employees: employeeFilter });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Server error' });

    }

});


routerEmployee.get('/dashboard/sorting', async (req, res) => {

    try {

        const { sortBy } = req.query;

        const employeesSorted = await employeeModel.find().sort({ salary: sortBy === 'asc' ? 1 : -1 });

        return res.json({ employees: employeesSorted });

    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Server error' });

    }

});

routerEmployee.get('/dashboard/searching', async (req, res) => {

    try {

        const { search } = req.query;


        const dataSearch = { firstName: { $regex: search, $options: 'i' } };

        const employeesSerch = await EmployModel.find(dataSearch);

        return res.json({ employees: employeesSerch });
    }
    catch (error) {

        console.error(error);

        return res.status(500).json({ message: 'Internal server error' });

    }

});

module.exports = { routerEmployee }