# VersaMoonwatch
Fit Versa Clockface in the style of the Omega SpeedMaster Professional

Using the Fitbit SDK https://dev.fitbit.com/ I recreated the look of a black dial Omega Speedmaster Professional in Fitbit form.
To run this you need to have a https://studio.fitbit.com account and manually copy over the files.

Functions:
* Chronograph

  Tapping the upper right side of the screen starts and stops the chronograph feature.
  While the chronograph runs, seconds are shown on the big sweep hand.  Minutes are on the right side subdial 0-30.  You have to mentally add 30 min when the hours subdial below is more than halfway between hours.  You get used to it.
  Tapping the lower left side of the screen resets the chronometer to zero.  If the chronograph is running it will reset to zero and continue to accumulate time.
  
* Haptics

  Stopping and starting the chronograph give a reassuring vibrational "bump" to the user to let them know they hit the button right.  Resetting the chronograph gives a vibrational "double bump".

* Chronometer
  
  Watch function. The short central hand points to the hour, while the longer central hand points to the minutes.  The current seconds is shown in the left subdial.

* Lume
  
  Tapping the middle left part of the display switches the watch to night mode, showing the luminous paint on the dial
  
* Todos!

  * The properties of color, size and position in the svg.gui documents could be exctracted to the .css file
  * The indices could also be moved to their own symbol.gui files and imported to increase readability of the code
  * Test if a static image makes a more performant dial than the rendering of the entire thing via svg.
  * Rearrange the index.gui in such a way to allow rendering on Fit Ionic watches.  Right now the hands are all in the wrong places when deployed to Ionic.
