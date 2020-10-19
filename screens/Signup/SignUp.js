import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";

import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";
import DatePicker from 'react-native-date-picker'




const FirstRoute = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    useEffect(() => {

        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    

}, [])
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    return (

        <View >
            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={0.3} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
            </View>
            <Text style={styles.labelText}>What should we call you here?</Text>
            <Input
                placeholder='Username'
                style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
                labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
            />
            <Text style={styles.lowerTextfield}>(This is your username)</Text>


            <Text style={styles.labelText}>What is your First name</Text>
            <Input
                placeholder='Firstname'

                style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
            />
           <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>

            <Text style={styles.labelText}>What is your Last name</Text>
            <Input
                placeholder='Lastname'

                style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }}
            />
           <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>
 

            <Button containerStyle={{ marginHorizontal: 20 }}
                onPress={() => SecondRoute}
                title="Continue"
                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

            />

        </View>

    )
};

const SecondRoute = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const [contractValue, setcontractValue] = useState("");
    const [considerValue, setconsiderValue] = useState("");
    const [meetValue, setmeetValue] = useState("");
    const [date, setDate] = useState(new Date())


    return (
        <SafeAreaView >
            <ScrollView>
                <View>
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I am</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={selectedValue}
                                style={{ height: 35, width: "100%" }}
                                value={selectedValue}
                                onValueChange={itemValue => setSelectedValue(itemValue)}
                                label="I am"
                            >
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                <Picker.Item label="Gender Diverse" value="Gender Diverse" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Wanting to be contacted by</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={contractValue}
                                style={{ height: 35, width: "100%" }}
                                value={contractValue}
                                onValueChange={itemValue => setcontractValue(itemValue)}
                                label="I am">
                                <Picker.Item label="men only" value="0" />
                                <Picker.Item label="women only" value="1" />
                                <Picker.Item label="gender diverse only" value="2" />
                                <Picker.Item label="everyone" value="3" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, height: 50 }}
                            buttonStyle={{ height: 50, borderRadius: 10 }}
                            title="Why do we ask this if its
  not for dating or sex?"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I consider myself</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={considerValue}
                                style={{ height: 35, width: "100%" }}
                                value={considerValue}
                                onValueChange={itemValue => setconsiderValue(itemValue)}
                                label="I am">
                                <Picker.Item label="Outgoing" value="Outgoing" />
                                <Picker.Item label="On the Quieter Side" value="On the Quieter Side" />
                                <Picker.Item label="A Mix of Both" value="A Mix of Both" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>And</Text>
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I want to meet</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={meetValue}
                                style={{ height: 35, width: "100%" }}
                                value={meetValue}
                                onValueChange={itemValue => setmeetValue(itemValue)}
                                label="I am">
                                <Picker.Item label="a few goods friends" value="1" />
                                <Picker.Item label="a lot of accquaintances" value="2" />
                                <Picker.Item label="no preference" value="3" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
};



const ThirdRoute = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello</Text>
        </View>
    )
}
const FourthRoute = props => {


    const [liveValue, setliveValue] = useState("");
    const [activityValue, setactivityValue] = useState("");


    return (
        <ScrollView>
            <SafeAreaView>
                <View >
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.9} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>I live in</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={liveValue}
                                style={{ height: 35, width: "100%" }}
                                value={liveValue}
                                onValueChange={itemValue => setliveValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="Australia" value="au" />
                                <Picker.Item label="Canada" value="ca" />
                                <Picker.Item label="India" value="in" />
                                <Picker.Item label="New Zealand" value="nz" />
                                <Picker.Item label="Singapore" value="sg" />
                                <Picker.Item label="United Kingdom" value="uk" />
                                <Picker.Item label="United States" value="us" />
                            </Picker>
                        </View>
                    </View>


                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10 }}
                            title="Why isn't my country here?"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ marginHorizontal: 10, height: 50 }}
                            buttonStyle={{ height: 50, borderRadius: 10 }}
                        />
                    </View>
                    <View >
                        <Text style={styles.labelText}>at this postal/Zip code</Text>
                        <View >
                            <Input placeholder='potcode/Zip code' style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
                        </View>
                        <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>

                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            title="Why can i only meet people who live near me?"
                            containerStyle={{ marginHorizontal: 10, height: 50 }}
                            buttonStyle={{ height: 50, borderRadius: 10 }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Actvities/Interest</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={activityValue}
                                style={{ height: 35, width: "100%" }}
                                value={activityValue}
                                onValueChange={itemValue => setactivityValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />

                                {/* <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" /> */}
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.labelText}>Terms and Conditions</Text>

                    <View style={styles.overflowContainer}>

                        <Text style={styles.overflowContainerText}>
                            This Terms of Use (“Agreement”) is a legally binding agreement made by and
                            between Not 4 Dating, LLC
                            (“N4D”) and you, personally and, if applicable, on behalf of the entity for whom you are using this web
                            site (collectively, “you”). This Agreement governs your use of the not4dating.com web site (the “Site”)
                            and the services offered by N4D on the Site (the “Services”), so please read it carefully.

                            BY CLICKING THE “I AGREE” BUTTON OR ACCESSING OR USING ANY PART OF THE SITE, YOU AGREE THAT YOU HAVE
                            READ, UNDERSTAND AND AGREE TO BE BOUND BY THIS AGREEMENT AND THE TERMS AND CONDITIONS REFERENCED HEREIN,
                            WHETHER OR NOT YOU REGISTERED AS A MEMBER. IF YOU DO NOT AGREE TO BE SO BOUND, DO NOT ACCESS OR USE THE
                            WEB SITE. INTERNET TECHNOLOGY AND THE APPLICABLE LAWS, RULES, AND REGULATIONS CHANGE FREQUENTLY.
                            ACCORDINGLY, N4D RESERVES THE RIGHT TO MAKE CHANGES TO THIS AGREEMENT AT ANY TIME. YOUR CONTINUED USE OF
                            THE SITE AND SERVICES CONSTITUTES ASSENT TO ANY NEW PROVISION OF THIS AGREEMENT THAT MAY BE POSTED ON
                            THE WEB SITE.

                            You must be at least eighteen (18) years of age to register with the Site or use the Site. By using the
                            Site, you represent and warrant that you have the right, authority and capacity to enter into this
                            Agreement and to abide by all of the terms and conditions of this Agreement.

                            This Agreement will remain in full force and effect while you use the Site and/or are registered with
                            the Site.

                            Representations and Warranties.
                            Each party represents and warrants to the other party: (i)that it has the full power and authority to
                            enter into and perform its obligations under this Agreement; (ii)the assent to and performance by it of
                            its obligations under this Agreement do not constitute a breach of or conflict with any other agreement
                            or arrangement by which it is bound, or any applicable laws, regulations or rules; and (iii)this
                            Agreement contains legal, valid and binding obligations of the parties executing or assenting to this
                            Agreement, enforceable in accordance with its terms and conditions.
                            You represent and warrant to N4D that: (i)you will not infringe the patent, copyright, trademark, trade
                            secret, right of publicity or other right of any third party in your use of the Site and (ii)you will
                            comply with all applicable laws, rules and regulations in your use of the Site.

                            Prohibited Conduct
                            In your use of the Site, you may not: (i)infringe any patent, trademark, trade secret, copyright, right
                            of publicity or other right of any party; (ii)disrupt or interfere with the security or use of the Site
                            or any web sites linked to the Site; (iii)interfere with or damage the Site, including, without
                            limitation, through the use of viruses, cancel bots, Trojan horses, harmful code, flood pings, denial of
                            service attacks, packet or IP spoofing, forged routing or electronic mail address information, or
                            similar methods or technology; (iv)attempt to use another’s user name or password, impersonate another
                            person or entity, misrepresent your affiliation with a person or entity, including without limitation
                            N4D, or use a false identity; (v)attempt to obtain unauthorized access to the Site or portions of the
                            Site that are restricted from general access; (vi)engage, directly or indirectly, in transmission of
                            “spam,” chain letters, junk mail or any other type of unsolicited solicitation; (vii)collect, manually
                            or through an automatic process, information about other users without their express consent or other
                            information relating to the Site; (viii)submit false or misleading information to N4D; (ix)engage in any
                            activity that interferes with any third party’s ability to use or enjoy the Site; or (x)assist any third
                            party in engaging in any activity prohibited by this Agreement.

                            Privacy Policy
                            You agree to the terms of N4D’s Privacy Policy, which is incorporated by reference into this Agreement.

                            Intellectual Property
                            All materials on the Site, including without limitation, the N4D logo, design, text, graphics, other
                            files, and the selection and arrangement thereof are either owned by N4D or are the property of N4D’s
                            suppliers or licensors. You may not use such materials without permission.

                            NOT4DATING™ and the NOT4DATING logo™ are trademarks owned by N4D. Page headers, custom graphics, button
                            icons and scripts are trademarks or trade dress of N4D. You may not use any of these trademarks, trade
                            dress, or trade names without express permission of N4D. N4D will retain ownership of its intellectual
                            property rights and you may not obtain any rights therein by virtue of this Agreement or otherwise.

                            You will have no right to use, copy, display, perform, create derivative works from, distribute, have
                            distributed, transmit or sublicense from materials or content available on the Site. You may not use any
                            third-party intellectual property without the express written permission of the applicable third party,
                            except as permitted by law.

                            Content Posted by You
                            You will not post on the Site or transmit to N4D members, any obscene, abusive, harassing or illegal
                            material or any material that infringes or violates another party’s rights. You will not provide
                            misleading or false information to N4D or to other members. N4D may review and delete any content which,
                            in N4D’s sole discretion, violates this Agreement or which might be offensive, illegal, or that might
                            violate the rights or threaten the safety of other members. By posting information on the Site, you
                            automatically grant to N4D an irrevocable, perpetual, non-exclusive, royalty-free, worldwide license to
                            use the information and prepare derivative works thereof, and to grant and authorize sublicenses of the
                            foregoing.

                            Linking and Framing
                            You may not deep link to password-protected portions of the Site; or frame, inline link, or similarly
                            display any N4D content or property, including, without limitation, the Site.

                            Confidentiality
                            You may obtain information that is confidential and proprietary to N4D. Such information (“Confidential
                            Information”) may include, without limitation, consumer information, product information, marketing
                            information, and confidential communications from N4D. You shall keep all Confidential Information
                            confidential and not disclose it to any third party. Further, you shall not use the Confidential
                            Information for any purposes.

                            Indemnification
                            You agree to hold N4D and its employees, representatives, agents, attorneys, affiliates, directors,
                            employees, officers, managers and shareholders (the “Indemnified Parties”) harmless from any damage,
                            loss, cost or expense (including without limitation, attorneys’ fees and costs) incurred in connection
                            with any third-party claim, demand or action (“Claim”) brought or asserted against any of the
                            Indemnified Parties: (i)alleging facts or circumstances that would constitute a breach of any provision
                            of this Agreement by you or (ii)arising from, related to, or connected with your use of the Site. If you
                            are obligated to provide indemnification pursuant to this provision, N4D may, in its sole and absolute
                            discretion, control the disposition of any Claim at your sole cost and expense. Without limitation of
                            the foregoing, you may not settle, compromise or in any other manner dispose of any Claim without the
                            consent of N4D.

                            Disclaimers, Exclusions and Limitations
                            N4D PROVIDES THE ON AN “AS IS” AND “AS AVAILABLE” BASIS. N4D DOES NOT REPRESENT OR WARRANT THAT THE
                            SITE, ITS USE, OR ANY INFORMATION THEREFROM: (I)WILL BE UNINTERRUPTED, (II)WILL BE FREE OF DEFECTS,
                            INACCURACIES OR ERRORS, (III)WILL MEET YOUR REQUIREMENTS, OR (IV) WILL OPERATE IN THE CONFIGURATION OR
                            WITH OTHER HARDWARE OR SOFTWARE YOU USE.
                            N4D DOES NOT SCREEN ITS MEMBERS, CONDUCT BACKGROUND CHECKS ON ITS MEMBERS, OR CONFIRM THE ACCURACY OF
                            THE STATEMENTS OF ITS MEMBERS. N4D MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE CONDUCT OF
                            MEMBERS. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL INTERACTIONS WITH OTHER N4D MEMBERS

                            N4D MAKES NO WARRANTIES OTHER THAN THOSE MADE EXPRESSLY IN THIS AGREEMENT, AND HEREBY DISCLAIMS ANY AND
                            ALL IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE,
                            MERCHANTABILITY AND NON-INFRINGEMENT.
                            N4DWILL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, PUNITIVE OR
                            SPECIAL DAMAGES (INCLUDING DAMAGES RELATING TO LOST PROFITS, LOST DATA OR LOSS OF GOODWILL) ARISING OUT
                            OF, RELATING TO OR CONNECTED WITH THE USE OF THE SITE, BASED ON ANY CAUSE OF ACTION, EVEN IF ADVISED OF
                            THE POSSIBILITY OF SUCH DAMAGES.

                            Limitation of Liability
                            EXCEPT FOR A BREACH OF A PARTY’S REPRESENTATIONS AND WARRANTIES OR IN CONNECTION WITH YOUR INDEMNITY
                            OBLIGATIONS UNDER THIS AGREEMENT, IN NO EVENT WILL THE LIABILITY OF EITHER PARTY IN CONNECTION WITH THIS
                            AGREEMENT OR THE SITE EXCEED $100.

                            Force Majeure
                            N4D will not be liable for failing to perform under this Agreement by the occurrence of any event beyond
                            its reasonable control, including, without limitation, a labor disturbance, an Internet outage or
                            interruption of service, a communications outage, failure by a service provider to N4D to perform, fire,
                            terrorism, natural disaster or war.

                            Arbitration
                            All disputes arising out of or relating to this Agreement (including its formation, performance or
                            alleged breach) or your use of the Site will be exclusively resolved under confidential binding
                            arbitration held in New York, New York before and in accordance with the Rules of the American
                            Arbitration Association. The arbitrator’s award will be binding and may be entered as a judgment in any
                            court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under
                            this Agreement will be joined to an arbitration involving any other party subject to this Agreement,
                            whether through class arbitration proceedings or otherwise. Notwithstanding the foregoing, N4D will have
                            the right to seek injunctive or other equitable relief in state or federal court located in New York,
                            New York to enforce this Agreement or prevent an infringement of a third party’s rights. In the event
                            equitable relief is sought, each party hereby irrevocably submits to the personal jurisdiction of such
                            court.

                            Waiver of Class Action Rights
                            By entering into this Agreement, you hereby irrevocably waive any right you may have to join claims with
                            those of others in the form of a class action or similar procedural device. Any claims arising out of,
                            relating to, or connected with this Agreement must be asserted individually.

                            Limitation of Actions
                            You acknowledge and agree that, regardless of any statute or law to the contrary, any claim or cause of
                            action you may have arising out of, relating to, or connected with your use of the Site must be filed
                            within one calendar year after such claim or cause of action arises, or forever be barred.

                            Changes to the Web Site or Service
                            N4D may, in its sole discretion, change, modify, suspend, make improvements to or discontinue any aspect
                            of the Site, temporarily or permanently, at any time without notice to you, and N4D will not be liable
                            for doing so. Without limiting the foregoing, and notwithstanding anything contained in this Agreement,
                            N4D will have the right from time to time to change the amount of the fees or institute new fees
                            relating to the Site. Further, N4D may impose limits on the amount of storage space for members, or
                            delete materials: (i)stored for an excessive period of time; (ii)that are out-of-date; or (iii)relating
                            to an inactive member account.

                            Termination
                            N4D will have the right to terminate your account or your access to the Web Site if it reasonably
                            believes you have breached any of the terms and conditions of this Agreement or N4D discontinues the
                            Site.

                            Effect of Termination
                            If your account is terminated, N4D may delete any web sites, files, graphics or other content or
                            materials relating to your use of the Site on N4D’s servers or otherwise in its possession and N4D will
                            have no liability to you or any third party for doing so. Following termination, you will not be
                            permitted to use the Site. If your account or your access to the Site is terminated, N4D reserves the
                            right to exercise whatever means it deems necessary to prevent unauthorized access to the Site,
                            including, but not limited to, technological barriers, IP mapping, and direct contact with your Internet
                            Service Provider.

                            Survival
                            This Agreement will survive indefinitely unless and until N4D chooses to terminate it, regardless of
                            whether any account you open is terminated by you or N4D or if you have the right to access or use the
                            Site.

                            This Agreement contain the entire understanding of the you and N4D regarding you and N4D regarding the
                            use of the Site, and supersedes all prior and contemporaneous agreements and understandings between you
                            and N4D regarding the use of the Site.

                            Notices and Electronic Communications
                            All notices required or permitted to be given under this Agreement will be in writing and delivered to
                            the other party by any of the following methods: (i)hand delivery, (ii)certified U.S. mail, return
                            receipt requested, postage prepaid, (iii)overnight courier, or (iv)electronic mail. If you give notice
                            to N4D, you must use the address shown on the Site. If N4D provides notice to you, it will use the
                            contact information provided by you to N4D. All notices will be deemed received and effective as
                            follows: (i)if by hand-delivery, on the date of delivery, (ii)if by delivery by U.S. mail, on the date
                            of receipt appearing on a return receipt card, (iii)if by overnight courier, on the date receipt is
                            confirmed by such courier service, or (iv)if by electronic mail, 24 hours after the message was sent, if
                            no “system error” or other notice of non-delivery is generated. Each party agrees that any notice that
                            it receives from the other party electronically satisfies any legal requirement that such communications
                            be in writing.

         </Text>


                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                </View>

            </SafeAreaView>
        </ScrollView>
    )



}



const FifthRoute = props => {
    return (
        <View >

            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={1} unfilledColor="white" color="#027BFF" animationType="spring" width={350} borderColor="white" height={20} borderRadius={10} />
            </View>
            <Input placeholder='Enter email address' style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />
            <Input placeholder='Confirm email address ' style={{ borderWidth: 1, paddingHorizontal: 8, marginTop: 4 }} />



            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
            </View>

            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 100, fontFamily: "roboto-bold" }}
                    buttonStyle={{ height: 50, fontFamily: "roboto-bold" }}
                    buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10, height: 50 }}
                    title="Previous"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
            </View>




        </View>


    )
}
//const initialLayout = { width: Dimensions.get('window').width };




//Export Upper Content

const SignUp = props => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    

    }, [])
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', },
        { key: 'second', },

        { key: 'Four' },
        { key: 'Fifth' }
    ]);

    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        Four: FourthRoute,
        Fifth: FifthRoute
    });

    return (
        <View style={{ flex: 1 }}>
     
            <TabView

                style={{ backgroundColor: "white" }}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                indicatorStyle={{ backgroundColor: 'transparent', height: 5.5 }}



            />
        </View>
    );

}
const styles = StyleSheet.create({
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat-ExtraLight',
        fontSize: 16
    },
    mainContainerPicker:
    {
        marginVertical: 8
    },
    overflowContainer:
    {
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 80,
        overflow: "hidden"

    },
    overflowContainerText:
    {
        marginHorizontal: 5,
        textAlign: "justify",
        marginVertical: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    lowerTextfield: {
        marginTop: -23,
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-ExtraLight'

    }

});




export default SignUp