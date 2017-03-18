import numpy as np
import cv2

def tc(x):
    pass

def tc1(x):
	pass

count = 0
x1, y1, x2, y2 = -1, -1, -1, -1
def draw(event, x, y, flags, param):
  global x1,y1,x2,y2,count
  if event == cv2.EVENT_LBUTTONDOWN:
    if (count == 0):
      x1 = x
      y1 = y
      count = 1
    elif (count == 1):
      x2 = x
      y2 = y
      count = 2
    print x1,y1,x2,y2

cap = cv2.VideoCapture(0)

cv2.namedWindow('img')
cv2.setMouseCallback('img',draw)

lower=np.array([0,0,0])
upper=np.array([179,255,255])

check = 0

while(1):
  ret ,frame = cap.read()
  frameflip = frame.copy()
  frame = cv2.flip(frameflip, 1)
  if ret == True:
    if count == 1:
      break
    else:
      cv2.imshow('img',frame)
    cv2.waitKey(5)
  else:
    break

while(1):
  cv2.imshow('img',frame)
  if (count == 2):
    frame = cv2.rectangle(frame, (x1,y1), (x2,y2), 255,2)
    frame1 = frame[y1:y2,x1:x2]
    cv2.imshow("rect",frame1)
    break
  k = cv2.waitKey(5) & 0xff
  if k == 27:
    break

check = 0

while(1):
  cv2.imshow("rect",frame1)
  hsv = cv2.cvtColor(frame1,cv2.COLOR_BGR2HSV)
  mask = cv2.inRange(hsv,lower,upper)
  res = cv2.bitwise_and(frame1,frame1,mask=mask)
  hist = cv2.calcHist([mask],[0],None,[2],[0,256])
  if check == 0:
    white = hist[1]
    check = 1
  elif check == 1:
    white1 = hist[1]
    if ((white1/white*100) >= 90):
      lower[0] = lower[0] + 1
    else:
      lower[0] = lower[0] - 1
      check = 2
  elif check == 2:
    white1 = hist[1]
    if (((white1)/white*100) >= 90):
      upper[0] = upper[0] - 1
    else:
      upper[0] = upper[0] + 1
      check = 3
  elif check == 3:
    white1 = hist[1]
    if (((white1)/white*100) >= 90):
      lower[1] = lower[1] + 1
    else:
      lower[1] = lower[1] - 1
      check = 4
  elif check == 4:
    white1 = hist[1]
    if (((white1)/white*100) >= 90):
      upper[1] = upper[1] - 1
    else:
      upper[1] = upper[1] + 1
      check = 5
  elif check == 5:
    white1 = hist[1]
    if (((white1)/white*100) >= 90):
      lower[2] = lower[2] + 1
    else:
      lower[2] = lower[2] - 1
      check = 6
  elif check == 6:
    white1 = hist[1]
    if (((white1)/white*100) >= 90):
      upper[2] = upper[2] - 1
    else:
      upper[2] = upper[2] + 1
      check = 7
      mask = cv2.inRange(hsv,lower,upper)
      cv2.destroyWindow("mask")
      cv2.destroyWindow("rect")
      cv2.destroyWindow("res")
      break
  cv2.imshow("mask",mask)
  cv2.imshow("res",res)
  k = cv2.waitKey(5) & 0xff
  if k == 27:
    break

print lower, upper

r = 0
b = 255
g = 0
t = 2
si = 0
check = 0
up = 0
drawf1def = 0
while(1):
  ret ,frame = cap.read()
  frameflip = frame.copy()
  frame = cv2.flip(frameflip, 1)
  if (drawf1def == 0):
    drawf1 = np.zeros((np.shape(frame)[0], np.shape(frame)[1], np.shape(frame)[2]), np.uint8)
    drawf1def = 1
  hsv = cv2.cvtColor(frame,cv2.COLOR_BGR2HSV)
  mask = cv2.inRange(hsv, lower, upper)
  res = cv2.bitwise_and(frame, frame, mask = mask)
  if ret == True:
    if up == 0:
      m = cv2.moments(mask)
      if (m['m00'] <= 0):
        check = 0
      elif check == 0:
        cx = int(m['m10']/m['m00'])
        cy = int(m['m01']/m['m00'])
        check = 1
      else:
        cxnew = int(m['m10']/m['m00'])
        cynew = int(m['m01']/m['m00'])
        cv2.line(drawf1, (cx,cy), (cxnew, cynew), (b,g,r), t)
        cx = cxnew
        cy = cynew
    cv2.imshow('draw', drawf1+res)
    k = cv2.waitKey(5) & 0xff
    if k == 27:
      break
    elif k == ord('q'):
      cv2.imwrite(str(si)+'.jpg', drawf1)
      drawf1 = np.zeros((np.shape(frame)[0], np.shape(frame)[1], np.shape(frame)[2]), np.uint8)
      check = 0
      si = si + 1
    elif k == ord('u'):
      if (up == 0):
        check = 0
        up = 1
      else:
        up = 0
    elif k == ord('p'):
      img = np.zeros((500,500,3),np.uint8)
      cv2.namedWindow("Color Picker")

      cv2.createTrackbar("red","Color Picker",0,255,tc1)
      cv2.createTrackbar("green","Color Picker",0,255,tc1)
      cv2.createTrackbar("blue","Color Picker",0,255,tc1)
      cv2.createTrackbar("Brush Thickness", "Color Picker", 2, 50, tc1)
      cv2.createTrackbar("Eraser","Color Picker",0,1,tc1)

      while(1):
        cv2.imshow("Color Picker",img)
        if(cv2.waitKey(20) & 0xFF == 27):
          break
        r = cv2.getTrackbarPos("red","Color Picker")
        g = cv2.getTrackbarPos("green","Color Picker")
        b = cv2.getTrackbarPos("blue","Color Picker")
        t = cv2.getTrackbarPos("Brush Thickness", "Color Picker")
        eraser = cv2.getTrackbarPos("eraser","Color Picker")
        if(eraser == 1):
          r = 0
          b = 0
          g = 0
        img[:] = [b, g, r]
      cv2.destroyWindow("Color Picker")
  else:
    break

cv2.destroyAllWindows()
cap.release()