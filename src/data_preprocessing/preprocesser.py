# @author: Shaun

from parameters import constants
from utils import csv_utils
from utils import json_utils
from utils import dir_utils
from utils import list_utils
from utils import data_type_utils
from processing import memory_processing
from processing import company_processing
from processing import average_calculator

import re

if __name__ == "__main__":

    # Read csv and take the first line as headings
    data = csv_utils.read_csv(constants.csv_filepath)
    headings = data.pop(0)

    data_values = list_utils.filter_2d_list(data, headings, constants.fields_of_interest)

    all_numbers_list = []
    numeric_regex = "\d+\.\d+|\d+"
    for list in data_values:
        numbers_list = []
        for elem in list:
            numeric_values = re.findall(numeric_regex, elem)
            value = numeric_values[0]
            numbers_list.append(value)
        all_numbers_list.append(numbers_list)

    all_numbers_list = data_type_utils.two_d_list_string_to_float(all_numbers_list)

    all_numbers_list = memory_processing.normalise_memory_2d_list(all_numbers_list, data_values, constants.fields_of_interest.index("Memory"))

    companies_count = company_processing.find_companies_count(data, headings.index("Company"))

    average_data_values = average_calculator.calculate_averages(all_numbers_list)


    average_data_values[4] = average_data_values[4]/1000;

    print(companies_count)
    # print(i)
    # print(data_values)
    # print(all_numbers_list)
    print(average_data_values)

    dir_utils.create_dir("../visualisation/preprocessed_data/")
    json_utils.write_to_file("../visualisation/preprocessed_data/field_headings.json", constants.processed_fields_headings)
    json_utils.write_to_file("../visualisation/preprocessed_data/average_values.json", average_data_values)



    # find_averages(constants.)
