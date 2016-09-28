package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.request.Request;
import ca.brij.dao.request.RequestDao;
import ca.brij.utils.MergeBeanUtil;

@RestController
public class RequestController {

	@Autowired
	private RequestDao requestDao;
	
	/**
	 * Save request. The person who made the request becomes the owner
	 * of the request
	 * @param request
	 * @param principal
	 * @return status of request
	 */
	@RequestMapping(value = "/request/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveRequest(@RequestBody Request request, Principal principal){
		
		try{
			request.setUserID(principal.getName());
			if(requestDao.findByUserAndPost(request.getUserID(), request.getPostID()) == null){
				request.setCreationDate(Calendar.getInstance());
			}
			requestDao.save(request);
			
		}catch(Exception e){
			return "Error saving request: " + e.toString();
		}
		
		return "Success";
	}
	
	/**
	 * Used to update by someone who is not the owner of the post
	 * It assumes that the request has been made
	 * @param request
	 * @return status of request
	 */
	@RequestMapping(value = "/request/edit", method = RequestMethod.POST)
	@ResponseBody
	public String editRequest(@RequestBody Request request){
		
		try{
			if(request.getRequestID() == null || request.getUserID() == null){
				throw new Exception("No ID or user provided");
			}
			Request oldRequest = requestDao.findById(request.getRequestID());
			if(oldRequest == null){
				oldRequest = request;
			}else{
				MergeBeanUtil.copyNonNullProperties(request, oldRequest);
			}
			requestDao.save(oldRequest);
		}catch(Exception e){
			return "Error saving request: " + e.toString();
		}
		
		return "Success";
	}
	
	@RequestMapping(value = "/admin/request/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findAll(){
		ArrayList<Request> requests = null;
		try{
			requests = requestDao.findAll();
		}catch(Exception e){
			return null;
		}
		
		return requests;
	}
	@RequestMapping(value = "/request/findById", method = RequestMethod.GET)
	@ResponseBody
	public Request findById(int requestID){
		Request request = null;
		try{
			request = requestDao.findById(requestID);
		}catch(Exception e){
			return null;
		}
		return request;
	}
	
	/**
	 * Will find all the requests made by the person that requested it.
	 * @param principal
	 * @return list of requests
	 */
	@RequestMapping(value = "/request/findByRequester", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findByRequester(Principal principal){
		ArrayList<Request> requests = null;
		try{
			requests = requestDao.findByUser(principal.getName());
		}catch(Exception e){
			return null;
		}
		return requests;
	}
	
	/**
	 * Will find all the requests made by the person passed as a parameter
	 * @param UserID
	 * @return list of requests
	 */
	@RequestMapping(value = "/request/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findByUser(String userID){
		ArrayList<Request> requests = null;
		try{
			requests = requestDao.findByUser(userID);
		}catch(Exception e){
			return null;
		}
		return requests;
	}
	
	/**
	 * Will find all the requests made by the person passed as a parameter
	 * @param UserID
	 * @return list of requests
	 */
	@RequestMapping(value = "/request/findByPost", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findByPost(int postID){
		ArrayList<Request> requests = null;
		try{
			requests = requestDao.findByPost(postID);
		}catch(Exception e){
			return null;
		}
		return requests;
	}
	
}
