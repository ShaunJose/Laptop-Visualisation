# @author: Shaun

from itertools import repeat

def calculate_averages(data_values):

    average_values = [0] * len(data_values[0])

    for list in data_values:
        for i in range(0, len(list)):
            average_values[i] += list[i]

    data_values_count = len(data_values)
    for i in range(0, len(average_values)):
        average_values[i] = average_values[i]/data_values_count

    return average_values


def average_company_screen(values_2d_list, all_data, companies_count, companies_list, screen_index):

    sum_screen_sizes = _sum_values_by_company(values_2d_list, all_data, companies_list, screen_index)
    avg_screen_sizes = _avg_values_by_company(sum_screen_sizes, companies_list, companies_count)
    return avg_screen_sizes

def average_company_memory(values_2d_list, all_data, companies_count, companies_list, memory_index):

    sum_mem = _sum_values_by_company(values_2d_list, all_data, companies_list, memory_index)
    avg_mem = _avg_values_by_company(sum_mem, companies_list, companies_count)
    return avg_mem

def average_company_weight(values_2d_list, all_data, companies_count, companies_list, weight_index):

    sum_weight = _sum_values_by_company(values_2d_list, all_data, companies_list, weight_index)
    avg_weight = _avg_values_by_company(sum_weight, companies_list, companies_count)
    return avg_weight

def average_company_price(values_2d_list, all_data, companies_count, companies_list, price_index):

    sum_price = _sum_values_by_company(values_2d_list, all_data, companies_list, price_index)
    avg_price = _avg_values_by_company(sum_price, companies_list, companies_count)
    return avg_price


def _sum_values_by_company(values_2d_list, all_data, companies_list, value_index):

    company_index = 1
    sum_values_per_company = [0] * len(companies_list)

    # sum screen sizes per company
    for i in range(0, len(all_data)):
        laptop_info_list = all_data[i]
        values_list = values_2d_list[i]
        value = values_list[value_index]
        company = laptop_info_list[company_index]
        index = companies_list.index(company)
        sum_values_per_company[index] += value

    return sum_values_per_company


def _avg_values_by_company(sum_of_values, companies_list, companies_count):

    avg_screen_sizes = []

    for i in range(0, len(sum_of_values)):
        company = companies_list[i]
        companies_num = companies_count[company]
        avg_screen_sizes.append(sum_of_values[i]/companies_num)

    return avg_screen_sizes
