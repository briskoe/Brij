package ca.brij.controller;

import org.apache.log4j.Logger;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HeartBeatController {

	final static Logger logger = Logger.getLogger(HeartBeatController.class);

    @RequestMapping(value = "/heartbeat", method = RequestMethod.GET)
    public String heartbeat() {
        logger.info("Received heartbeat!");
        return "I'm Alive!";
    }
}
