# @author: Shaun

def two_d_list_string_to_float(two_d_list):

    for list in two_d_list:
        list = __list_string_to_float(list)

    return two_d_list
    

def __list_string_to_float(list):

    for i in range(0, len(list)):
        list[i] = (float) (list[i])

    return list
