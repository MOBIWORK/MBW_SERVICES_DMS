def render_string(default_str,value) :
    if default_str !=None and value not in default_str:
        return f"{default_str};{value}"
    elif default_str ==None and value :
        return value
    else :
        return default_str