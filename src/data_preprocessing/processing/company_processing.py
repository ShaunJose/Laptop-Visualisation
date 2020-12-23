# @author: Shaun

def find_companies_count(data_list, company_index):

    companies_count = {}

    for list in data_list:
        company = list[company_index]
        if company not in companies_count:
            companies_count[company] = 1
        else:
            companies_count[company] += 1

    return companies_count
