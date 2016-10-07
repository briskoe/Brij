package ca.brij.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ca.brij.bean.posting.Posting;
import ca.brij.bean.request.Request;
import ca.brij.dao.posting.PostingDao;
import ca.brij.dao.request.RequestDao;
import ca.brij.dao.service.ServiceDao;
import ca.brij.utils.MergeBeanUtil;
import ca.brij.utils.NotificationSenderUtil;

@RestController
public class RequestController {

	@Autowired
	private RequestDao requestDao;
	
	@Autowired
	private NotificationSenderUtil notificationUtils;
	
	@Autowired
	private PostingDao postingDao;
	
	@Autowired
	private ServiceDao serviceDao;
	
	/**
	 * Save request. The person who made the request becomes the owner
	 * of the request
	 * @param request
	 * @param principal
	 * @return status of request
	 * @throws Exception 
	 */
	@RequestMapping(value = "/request/save", method = RequestMethod.POST)
	@ResponseBody
	public String saveRequest(@RequestBody Request request, Principal principal) throws Exception{
		
		try{
			logger.info("Saving request made by: " + principal.getName());
			request.setUserID(principal.getName());
			//see if the request exist
			Request oldRequest = requestDao.findByUserAndPost(request.getUserID(), request.getPostID()) ;
			if(oldRequest == null){
				//if it doesn't set up creation date and assign the new request
				request.setCreationDate(Calendar.getInstance());
				oldRequest = request;
			}else{
				//if it old, set up the properties from the new changes to the old
				MergeBeanUtil.copyNonNullProperties(request, oldRequest);
			}
			request = requestDao.save(oldRequest);
			
			Posting post = postingDao.getPostingById(request.getPostID());
			if(post != null){
				notificationUtils.makeNotification(post.getUserID(), NotificationSenderUtil.REQUEST_TYPE, request.getRequestID() ,
						principal.getName() + " have made a request for your post");
			}

			
		}catch(Exception e){
			logger.error("Error saving request " + e.getMessage());
			throw e;
		} 
		logger.info("Successfully saved request made by " + principal.getName());
		return "Success";
	}
	
	/**
	 * Used to update by someone who is not the owner of the post
	 * It assumes that the request has been made
	 * @param request
	 * @return status of request
	 * @throws Exception 
	 */
	@RequestMapping(value = "/request/edit", method = RequestMethod.POST)
	@ResponseBody
	public String editRequest(@RequestBody Request request) throws Exception{
		
		try{
			logger.info("Editing request made by: " + request.getUserID());
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
			logger.error("Error editing request " + e.getMessage());
			throw e;
		}
		logger.info("Successfully edit request!");
		return "Success";
	}
	
	@RequestMapping(value = "/admin/request/findAll", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findAll() throws Exception{
		ArrayList<Request> requests = null;
		try{
			logger.info("Finding All Requests");
			requests = requestDao.findAll();
		}catch(Exception e){
			logger.error("Error finding all requests " + e.getMessage());
			throw e;
		}
		logger.info("Successfully got all requests");
		return requests;
	}
	@RequestMapping(value = "/request/findById", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> findById(int id) throws Exception{
		Map<String, Object> requestDTO = new HashMap<String, Object>();
		Request request = null;
		Posting post = null;
		String serviceName = null;
		try{
			logger.info("Finding Request by ID: " + id);
			request = requestDao.findById(id);
			post = postingDao.getPostingById(request.getPostID());
			serviceName = serviceDao.getServiceById(post.getServID()).getServiceName();

		}catch(Exception e){
			logger.error("Error Finding request" + e.getMessage());
			throw e;
		}
		requestDTO.put("request", request);
		requestDTO.put("posting", post);
		requestDTO.put("serviceName", serviceName);
		logger.info("Successfully found request by id: " + id);
		return requestDTO;
	}
	
	/**
	 * Will find all the requests made by the person that requested it.
	 * @param principal
	 * @return list of requests
	 * @throws Exception 
	 */
	@RequestMapping(value = "/request/findByRequester", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> findByRequester(Principal principal, @RequestParam(value = "pageNo", required=false) Integer pageNo,@RequestParam(value = "pageSize", required=false) Integer pageSize ) throws Exception{
		Map<String, Object> requestMap = new HashMap<String, Object>();
		ArrayList<Request> requests = null;
		int numberOfPages = 0;
		String postTitle = "";
		
		try{
			if(pageNo == null){
				pageNo = 0;
			}
			if(pageSize == null){
				pageSize = 10;
			}
			logger.info("Finding all request made by the requester " + principal.getName());
			
			requests = requestDao.findByUser(principal.getName(), new PageRequest(pageNo, pageSize));
			numberOfPages = (int)Math.ceil((double)requestDao.getCountForUser(principal.getName()) / (double)pageSize);
			
		}catch(Exception e){
			logger.error("Error finding all request made by the requester " + e.getMessage());
			throw e;
		}
		logger.info("Successfully retrieved all requests made by : " + principal.getName());
		requestMap.put("list", requests);
		requestMap.put("numberOfPages", numberOfPages);
		requestMap.put("currentPage", (pageNo + 1));
		
		return requestMap;
	}
	
	/**
	 * Will find all the requests made by the person passed as a parameter
	 * @param UserID
	 * @return list of requests
	 * @throws Exception 
	 */
	@RequestMapping(value = "/request/findByUser", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> findByUser(String userID, @RequestParam(value = "pageNo", required=false) Integer pageNo,@RequestParam(value = "pageSize", required=false) Integer pageSize ) throws Exception{
		Map<String, Object> requestMap = new HashMap<String, Object>();
		ArrayList<Request> requests = null;
		int numberOfPages = 0;
		
		try{
			if(pageNo == null){
				pageNo = 0;
			}
			if(pageSize == null){
				pageSize = 10;
			}
			logger.info("Finding all requests made by user " + userID);
			requests = requestDao.findByUser(userID, new PageRequest(pageNo, pageSize));
			numberOfPages = (int)Math.ceil((double)requestDao.getCountForUser(userID) / (double)pageSize);
		}catch(Exception e){
			logger.error("Error finding all requests made by user " + userID);
			throw e;
		}
		logger.info("Successfully find all request made by user " + userID);
		requestMap.put("list", requests);
		requestMap.put("numberOfPages", numberOfPages);
		requestMap.put("currentPage", (pageNo + 1));
		return requestMap;
	}
	
	/**
	 * Will find all the requests made by the person passed as a parameter
	 * @param UserID
	 * @return list of requests
	 * @throws Exception 
	 */
	@RequestMapping(value = "/request/findByPost", method = RequestMethod.GET)
	@ResponseBody
	public ArrayList<Request> findByPost(int postID) throws Exception{
		ArrayList<Request> requests = null;
		try{
			logger.info("Finding request made for post with ID " + postID);
			requests = requestDao.findByPost(postID);
		}catch(Exception e){
			logger.error("Error finding requests made for post with ID "+ postID + " " + e.getMessage());
			throw e;
		}
		return requests;
	}
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

}
