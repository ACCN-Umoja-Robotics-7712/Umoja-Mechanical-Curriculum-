# Week 2 (November 1): Simple Machines & Robotics Mechanisms
**Duration**: 4-5 hours  
**Learning Style**: Hands-on exploration, mechanism analysis, collaborative discovery

## Session Overview
Students explore the six simple machines as the fundamental building blocks of all complex robotics systems. Through hands-on investigation and analysis of real FRC mechanisms, students understand how engineers combine simple principles to create sophisticated robot capabilities.

## Learning Objectives
By the end of Week 2, students will:
- Identify and explain the six types of simple machines
- Calculate mechanical advantage for different configurations
- Recognize simple machines within complex FRC mechanisms
- Understand how hooks, claws, elevators, and intakes work
- Apply simple machine principles to design basic mechanisms
- Connect theoretical concepts to practical FRC applications

## Weekly Schedule

### Hour 1: Simple Machines Foundation (60 minutes)
**Format**: Interactive exploration with hands-on demonstrations

#### Activities:
1. **Simple Machines Overview** (20 min)
   **Core Concept**: Simple Machine - any device with few or no moving parts used to modify motion and force needed to do work
   - **Purpose**: Multiplies user's little effort to create great effort
   - **Key Principle**: Uses mechanical advantage (effort multiplier)
   - **Complex Machines**: Consist of many simple machines combined
   - **FRC Connection**: Every robot mechanism uses simple machine principles

2. **The Six Simple Machines - Stations Setup** (40 min)
   Students rotate through hands-on stations:

   **Station 1: Inclined Plane** (7 min)
   - **Definition**: Sloping surface (ramp) used to lift heavy bodies
   - **Key Principle**: Steeper slope = greater force needed
   - **Physics Demo**: 
     - Flat surface force = mass × gravity (9.8 m/s²)
     - Incline force = Down Force × Sin(angle)
     - Always less force than lifting straight up
   - **Calculation Example**: 
     - 10kg block on flat = 98N force required
     - Same block on 15° incline = 25.4N force required
     - Same block on 30° incline = 49N force required
   - **FRC Applications**: Pickup ramps, scoring platforms, climbing approaches
   - **Hands-on**: Students test different ramp angles with weighted objects

   **Station 2: Wedge** (7 min)
   - **Definition**: Triangular tool (portable inclined plane)
   - **Functions**: Split, cut, tighten, hold, create aerodynamic shapes
   - **Examples**: Axe, knife, door stop, nail, aircraft wings
   - **Complex Example**: Zipper mechanism with multiple wedges
     - Two lower wedges close the zip
     - One upper wedge opens the zip
   - **FRC Applications**: Intake guides, game piece alignment, splitting mechanisms
   - **Hands-on**: Examine zipper operation and wedge tools

   **Station 3: Screw** (7 min)
   - **Definition**: Inclined plane wrapped around cylinder
   - **Primary Use**: Hold things together, create linear motion
   - **Types**: Fastening screws, linear actuators (screw jacks)
   - **Mechanical Advantage**: Large rotation creates small linear movement with high force
   - **FRC Applications**: Assembly fasteners, linear actuators, fine positioning
   - **Hands-on**: Operate screw jack, examine thread patterns

   **Station 4: Pulley** (7 min)
   - **Definition**: Grooved circular disk guiding rope/cable
   - **Single Pulley**: Changes direction of force only
   - **Multiple Pulleys**: Changes both amount and direction of effort
   - **Mechanical Advantage**: Each supporting rope reduces effort
   - **Examples**: Cranes, elevators, climbing systems
   - **FRC Applications**: Climbing mechanisms, lifting systems, tensioning
   - **Hands-on**: Build simple pulley systems, test mechanical advantage

   **Station 5: Wheel and Axle** (7 min)
   - **Definition**: Circular wheel connected to circular shaft
   - **Function**: Increases rotational force (torque) instead of linear force
   - **Key Concept**: Larger wheel diameter = greater mechanical advantage
   - **Torque**: Critical for gear systems and power transmission
   - **FRC Applications**: Drive systems, rotating mechanisms, gear trains
   - **Hands-on**: Test different wheel sizes, feel torque differences

   **Station 6: Lever** (5 min)
   - **Definition**: Long beam resting on fulcrum/pivot point
   - **Principle**: Fulcrum close to load, effort far from fulcrum = mechanical advantage
   - **Components**: Load (output force), effort (input force), fulcrum (pivot)
   - **Example**: Prybar for separating objects
   - **FRC Applications**: Arm mechanisms, lifting systems, actuator amplifiers
   - **Hands-on**: Use actual prybar, test lever configurations

**Materials Needed**:
- Ramps at different angles with test weights
- Various wedge tools and zipper examples
- Screw jack and threading examples
- Pulley systems with ropes and weights
- Wheels of different sizes on axles
- Levers and prybar for demonstration

### Hour 2: Mechanical Advantage Calculations (60 minutes)
**Format**: Mathematical analysis with practical verification

#### Activities:
1. **Understanding Mechanical Advantage** (25 min)
   **Definition**: Ratio of output force to input force
   - **Formula**: MA = Output Force ÷ Input Force
   - **Greater than 1**: Force amplification (most common)
   - **Less than 1**: Speed amplification (less common)
   - **Equal to 1**: Direction change only

   **Calculation Examples**:
   **Inclined Plane**:
   - MA = 1 ÷ Sin(angle)
   - 15° incline: MA = 1 ÷ Sin(15°) = 3.9
   - 30° incline: MA = 1 ÷ Sin(30°) = 2.0

   **Lever**:
   - MA = Effort Arm Length ÷ Load Arm Length
   - 3-foot effort arm, 6-inch load arm: MA = 36" ÷ 6" = 6

   **Pulley System**:
   - MA = Number of rope segments supporting load
   - 4 supporting segments: MA = 4

2. **Hands-on Verification** (25 min)
   **Measurement Challenge**: Students verify theoretical calculations
   - Use spring scales to measure actual forces
   - Compare theoretical vs. measured mechanical advantage
   - Understand why real-world results differ (friction, efficiency)
   - Document findings and analyze discrepancies

3. **FRC Application Problems** (10 min)
   **Design Scenarios**:
   - "Design a climbing system that can lift a 120-lb robot using a 30-lb force"
   - "Create an intake ramp that reduces the force needed to collect game pieces by 75%"
   - Students calculate required mechanical advantage and select appropriate simple machines

**Materials Needed**:
- Spring scales for force measurement
- Calculators and worksheets
- Various simple machines for testing
- Measuring tools for distances and angles

### Hour 3: FRC Mechanisms Analysis (60 minutes)
**Format**: Real mechanism exploration with video analysis

#### Activities:
1. **Hooks & Climbing Mechanisms** (20 min)
   **Definition**: Mechanisms for grasping objects in a "pulling" manner

   **Case Study: AndyMark Climber in a Box**
   - **Video**: "Climber in a box (1 Minute)" - https://www.youtube.com/watch?v=iZadt9wJaOo
   - **Components Analysis**:
     - Hook: Engaging mechanism
     - Two shafts (inner/outer): Extension system
     - Bearing kit: Smooth operation
     - Winch plate: Force multiplication
     - Motor and gearbox: Power source

   **Operation Understanding**:
   - **Two States**: Deployed (maximum length) and ready (minimum length)
   - **Extension**: Constant force spring extends inner shaft
   - **Retraction**: Winch cord pulls system back to ready state
   - **Simple Machine Analysis**: 
     - Pulley system (winch mechanism)
     - Lever principles (hook engagement)
     - Spring as stored energy system

   **Additional Video**: "Rope assembly – Used to retract Hook / Climb (3 MINUTES)" - https://www.youtube.com/watch?v=G9H6aP9wJUs

2. **Claws & Grasping Mechanisms** (25 min)
   **Three Categories of Claws**:

   **Single-Sided Claws**:
   - Fixed structural piece + motorized moving piece
   - Motor/gear system opens and closes claw
   - Clamps game piece against fixed surface
   - **Simple Machines**: Lever (claw arm) + gear system (wheel and axle)
   - **Mechanical Advantage**: Gear reduction increases clamping force

   **Double-Sided Claws**:
   - Both sides activate simultaneously
   - Even number of gears for coordinated movement
   - First gear connects to one side, last gear to other side
   - **Simple Machines**: Multiple interconnected gear systems
   - **Advantage**: Centered gripping, equal force distribution

   **Roller Claws**:
   - Use wheels, intake rollers, or tank treads
   - Spin to pull game pieces in, reverse to push out
   - Can have one fixed side or rollers on both sides
   - Designed to spin faster than robot movement speed
   - **Simple Machines**: Wheel and axle + friction principles
   - **Advantage**: Less precise alignment required

   **Video Analysis**: "Understanding Claws" - https://www.youtube.com/watch?v=X4JHUDGzyv0&t=59s
   - Students identify simple machines in each claw type
   - Calculate mechanical advantage where possible
   - Discuss trade-offs between different approaches

3. **Elevators (Linear Slides)** (15 min)
   **Two Main Categories**: Continuous and Cascading

   **Continuous Rigging**:
   - **Video**: https://www.youtube.com/watch?v=orezTYhf6FM (5 minutes)
   - Simple extension system with direct cable connection
   - **Simple Machines**: Pulley systems + guide rails (inclined plane principles)
   - **Advantage**: Simple, reliable, easy to control

   **Cascade Rigging**:
   - **Video**: https://www.youtube.com/watch?v=zV4m8BtDQRI (5 minutes)
   - Complex rigging where each stage moves at different speeds
   - Second stage moves 2x faster than first, third moves 3x faster
   - **Simple Machines**: Complex pulley systems with multiple mechanical advantages
   - **Advantage**: Compact storage, high extension ratio

   **Simple Machine Analysis**:
   - Students identify pulleys, levers, and guide systems
   - Understand how multiple simple machines create complex motion
   - Calculate theoretical speeds and forces

**Materials Needed**:
- Video playback capability and large screen
- Real climbing mechanisms if available
- Various claw examples or detailed photos
- Linear slide examples
- Analysis worksheets for video content

### Hour 4: Intake Systems & Drive Mechanisms (60 minutes)
**Format**: Comprehensive mechanism analysis and design thinking

#### Activities:
1. **Intake System Analysis** (25 min)
   **Video Resources**:
   - https://www.youtube.com/watch?v=def5QH7UUIU
   - https://www.youtube.com/watch?v=HdQ-mWPG9GY
   - https://www.youtube.com/watch?v=5dS50DV7x9U (1 minute)
   - https://www.youtube.com/watch?v=CUbA1NEPsdw (5 minutes)
   - https://www.youtube.com/watch?v=JlKwRAvDue8 (5 minutes)

   **Intake Categories**:
   - **Roller Systems**: Continuous rotation to pull in game pieces
   - **Conveyor Systems**: Moving belts or chains for transport
   - **Vacuum Systems**: Air pressure differential for pickup
   - **Passive Systems**: Shape and gravity-based collection

   **Simple Machine Applications**:
   - **Rollers**: Wheel and axle with surface friction
   - **Conveyors**: Inclined plane + wheel and axle systems
   - **Guides**: Wedge shapes for alignment and direction

2. **Drive System Overview** (25 min)
   **Robot Composition**: Two main parts
   - **Base/Drivetrain**: Makes robot move around course
   - **Superstructure**: Completes specific tasks

   **Tank Drive System**:
   - Method of controlling motors using two controller axes
   - Each axis operates motors on one side of robot
   - **Simple Machines**: Wheel and axle + leverage principles for steering
   - **Variations**: Different wheel types, motor configurations

   **Mecanum Drive System**:
   - **Video**: https://www.youtube.com/watch?v=mKcHXxC8aJY
   - **Key Feature**: Omnidirectional movement capability
   - **Simple Machines**: Specialized wheel and axle systems with angled rollers
   - Students identify differences from tank drive

   **Swerve Drive System**:
   - **Video**: https://www.youtube.com/watch?v=FLnUZBHBczM
   - **Key Feature**: All wheels can move independently
   - Much greater maneuverability than tank or mecanum
   - **Simple Machines**: Complex wheel and axle + rotational positioning systems
   - **This Year's Focus**: Will build swerve drive using Thriftybot products

3. **Comparative Analysis** (10 min)
   Students create comparison matrix:
   - **Complexity**: Build difficulty and maintenance
   - **Maneuverability**: Movement capabilities
   - **Speed**: Maximum velocity potential
   - **Control**: Programming and driver skill requirements
   - **Cost**: Component and manufacturing costs
   - **Reliability**: Failure modes and robustness

**Materials Needed**:
- Video playback system
- Drive system examples or detailed photos
- Comparison worksheets
- Calculators for analysis

### Hour 5: Mechanism Design Challenge (45-60 minutes)
**Format**: Applied design using simple machine principles

#### Activities:
1. **Design Challenge Introduction** (10 min)
   **Challenge**: Design a mechanism that can pick up a ball from the floor and place it on a 2-foot shelf
   **Constraints**:
   - Must use at least 3 different simple machines
   - Must fit within 18" x 18" x 24" envelope
   - Must be operable by one person
   - Must be reliable for 50+ cycles

2. **Design Process Application** (25 min)
   **Teams Apply 7-Stage Process**:
   1. **Define Requirements**: Clarify challenge parameters
   2. **Brainstorm Solutions**: Generate multiple approaches using different simple machine combinations
   3. **Concept Selection**: Choose most promising approach
   4. **Basic Layout**: Sketch mechanism with approximate dimensions
   5. **Simple Analysis**: Calculate basic mechanical advantages
   6. **Prototype Planning**: Identify materials and construction approach
   7. **Iteration Planning**: Anticipate testing and improvement needs

   **Mentor Support**:
   - Help teams identify simple machines in their designs
   - Guide mechanical advantage calculations
   - Encourage creative combinations of principles
   - Connect designs to FRC mechanism examples

3. **Design Presentations** (15 min)
   **Team Presentations** (3 minutes each):
   - Explain chosen mechanism approach
   - Identify simple machines used and their functions
   - Show calculations for mechanical advantage
   - Discuss expected performance and potential issues
   - Receive peer feedback and suggestions

   **Assessment Criteria**:
   - Correct identification and application of simple machines
   - Sound engineering reasoning
   - Feasibility of proposed solution
   - Quality of presentation and teamwork

**Materials Needed**:
- Design challenge materials (balls, shelf setup)
- Large paper and drawing supplies
- Calculators and measurement tools
- Presentation space and timer

## Assessment
- **Simple Machine Identification**: Accurate recognition in various contexts
- **Mechanical Advantage Calculations**: Correct application of formulas and concepts
- **Mechanism Analysis**: Understanding of how complex systems use simple machine principles
- **Design Application**: Effective use of simple machines in original designs
- **Video Analysis**: Ability to identify and explain mechanisms in FRC examples

## Preparation for Week 3
- **Practice**: Identify simple machines in 5 everyday objects at home
- **Research**: Find one FRC mechanism video online and identify the simple machines used
- **Software**: Begin familiarizing with CAD software if possible (tutorials available online)
- **Reflection**: Consider which simple machines seem most useful for robotics applications

## Advanced Extensions
- Calculate efficiency losses in real simple machine systems
- Research historical development of simple machines
- Design compound machines using multiple simple machine types
- Analyze gear trains as wheel and axle systems

## Materials List
### Simple Machine Demonstrations
- Ramps at various angles with test weights
- Pulley systems with ropes and masses
- Levers of different lengths with fulcrums
- Screw jacks and threading examples
- Various wheel and axle combinations
- Wedge tools and examples

### Measurement and Analysis
- Spring scales for force measurement
- Protractors for angle measurement
- Rulers and measuring tapes
- Calculators and worksheets
- Stopwatches for timing tests

### Video and Reference Materials
- Large screen or projector for video analysis
- Internet access for FRC mechanism videos
- Reference materials and calculation aids
- Design challenge materials and supplies

## Safety Notes
- Proper handling of weights and testing equipment
- Safe operation of mechanical demonstrations
- Awareness of pinch points in moving mechanisms
- Team safety during collaborative activities

## Mentor Notes
- Help students see simple machines everywhere in the world around them
- Connect abstract mechanical advantage concepts to concrete examples
- Encourage hands-on exploration and testing
- Model systematic analysis of complex mechanisms
- Share real FRC experiences with mechanism successes and failures
- Prepare students for CAD work by emphasizing visualization skills

## Common Challenges & Solutions
- **Mechanical Advantage Confusion**: Use physical demonstrations before mathematical calculations
- **Complexity Overwhelm**: Break complex mechanisms into individual simple machine components
- **Video Analysis Difficulty**: Pause frequently and discuss what students observe
- **Design Paralysis**: Encourage rapid sketching and iteration over perfect initial concepts

This week establishes the mechanical foundation that students will use throughout the remaining program, especially as they begin CAD work and design their own mechanisms.