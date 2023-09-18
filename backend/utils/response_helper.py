from rest_framework import status

def response_helper(
        status:status=status.HTTP_202_ACCEPTED,
        message: str="", 
        success:bool=False, 
        data:dict[str, list, dict] = {} ,
    ) -> dict[str, list]:
    """This helper function is used to return response to the client side 
    this helps to keep response consistant accross the appication
    params
    ------
    :status_code = response supporting status code.
    :messag = response supporting message.
    :success = final status of the request.
    :data = requested data.

    Returns
    -------
    This method returns the dict of response data.

    """
    return {
        "message": message,
        "success": success,
        "data": data,
        "status_code": status
    }