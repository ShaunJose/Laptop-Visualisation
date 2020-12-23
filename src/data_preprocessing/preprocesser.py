# @author: Shaun

from parameters import constants
from utils import csv_utils
from utils import list_utils
from utils import data_type_utils
from processing import memory_processing
from processing import company_processing

import re

if __name__ == "__main__":

    # Read csv and take the first line as headings
    data = csv_utils.read_csv(constants.csv_filepath)
    headings = data.pop(0)

    listy_list = list_utils.filter_2d_list(data, headings, constants.numeric_fields)

    all_numbers_list = []
    numeric_regex = "\d+\.\d+|\d+"
    for list in listy_list:
        numbers_list = []
        for elem in list:
            numeric_values = re.findall(numeric_regex, elem)
            value = numeric_values[0]
            numbers_list.append(value)
        all_numbers_list.append(numbers_list)

    all_numbers_list = data_type_utils.two_d_list_string_to_float(all_numbers_list)

    all_numbers_list = memory_processing.normalise_memory_2d_list(all_numbers_list, listy_list, constants.numeric_fields.index("Memory"))

    companies_count = company_processing.find_companies_count(data, headings.index("Company"))

    i = 0
    for key in companies_count:
        i += companies_count[key]


    print(companies_count)
    print(i)

    # find_averages(constants.)
